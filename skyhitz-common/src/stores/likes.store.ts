import { observable, observe, IObservableObject } from 'mobx';
import * as L from 'list';
import { likesBackend } from '../backends/likes.backend';
import { Entry, User } from '../models';

export class LikesStore {
  @observable ids: Set<string> = new Set([]);
  @observable loading: boolean = false;
  @observable loadingEntryLikes: boolean = false;
  @observable entry!: Entry;
  @observable entryLikes: L.List<User> = L.from([]);
  @observable entryLikesCount!: number;
  @observable userLikes: L.List<Entry> = L.from([]);
  @observable userLikesCount!: number;
  @observable user!: User;

  public viewLimit: number = 8;
  disposer: any;
  userDisposer: any;

  get hasMoreLikers(): boolean {
    if (this.entryLikesCount > this.viewLimit) {
      return true;
    }
    return false;
  }

  get plusLikers() {
    return this.kFormatter(this.entryLikesCount - this.viewLimit);
  }

  kFormatter(num: number) {
    return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
  }

  constructor(
    public observables: IObservableObject,
    public session: IObservableObject
  ) {
    this.disposer = observe(observables, ({ object }) => {
      if (!object.entry) {
        return;
      }
      this.entry = object.entry;
      this.refreshEntryLikes(this.entry.id);
    });

    this.userDisposer = observe(this.session, ({ object }) => {
      this.user = object.user;
    });
  }

  public clearLikes() {
    this.entryLikes = L.from([]);
    this.userLikes = L.from([]);
  }

  public refreshEntryLikes(id: string) {
    this.loadingEntryLikes = true;
    likesBackend.entryLikes(id).then((payload) => {
      if (payload) {
        this.entryLikesCount = payload.count;
        let users = payload.users.map(
          (userPayload: any) => new User(userPayload)
        );
        this.entryLikes = L.from(users);
      }

      this.loadingEntryLikes = false;
    });
  }

  public refreshLikes() {
    this.loading = true;
    likesBackend.userLikes().then((userLikes) => {
      if (!userLikes) {
        return;
      } else {
        let ids = userLikes.map((like: any) => like.id);
        let entries = userLikes.map((like: any) => new Entry(like));
        this.ids = new Set(ids);
        this.userLikes = L.from(entries);
        this.userLikesCount = this.userLikes.length;
      }

      this.loading = false;
    });
  }

  async unlike(entry: Entry) {
    this.ids.delete(entry.id);
    let index = L.findIndex((like) => {
      if (like) {
        return like.id === entry.id;
      }
      return false;
    }, this.userLikes);
    this.userLikes = L.remove(index, 1, this.userLikes);
    let unliked = await likesBackend.like(entry.id, false);
    if (!unliked) {
      this.ids = this.ids.add(entry.id);
      this.userLikes = L.append(entry, this.userLikes);
    }
    this.userLikesCount = this.userLikes.length;

    let userIndex = L.findIndex((like) => {
      if (like) {
        return like.id === this.user.id;
      }
      return false;
    }, this.entryLikes);
    this.entryLikes = L.remove(userIndex, 1, this.entryLikes);
  }

  async like(entry: Entry) {
    this.ids = this.ids.add(entry.id);
    this.userLikes = L.append(entry, this.userLikes);
    let liked = await likesBackend.like(entry.id);
    if (!liked) {
      this.ids.delete(entry.id);
      let index = L.findIndex((like) => {
        if (like) {
          return like.id === entry.id;
        }
        return false;
      }, this.userLikes);
      this.userLikes = L.remove(index, 1, this.userLikes);
    }
    this.userLikesCount = this.userLikes.length;

    this.entryLikes = L.append(this.user, this.entryLikes);
  }

  public toggleLike(entry: Entry) {
    if (this.isEntryLiked(entry)) {
      return this.unlike(entry);
    }
    return this.like(entry);
  }

  get isLiked() {
    if (!this.entry) {
      return false;
    }
    return this.ids.has(this.entry.id);
  }

  isEntryLiked(entry: Entry) {
    if (!entry) {
      return false;
    }
    return this.ids.has(entry.id);
  }
}
