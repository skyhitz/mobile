import { observable, observe, IObservableObject } from 'mobx';
import { Set, List } from 'immutable';
import { likesBackend } from '../backends/likes.backend';
import { Entry, User } from '../models';

export class LikesStore {
  @observable ids: Set<string> = Set([]);
  @observable loading: boolean = false;
  @observable loadingEntryLikes: boolean = false;
  @observable entry: Entry;
  @observable entryLikes: List<User> = List([]);
  @observable entryLikesCount: number;
  @observable userLikes: List<Entry> = List([]);
  @observable userLikesCount: number;
  @observable user: User;

  public viewLimit: number = 8;

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
  ) {}

  public clearLikes() {
    this.entryLikes = List([]);
    this.userLikes = List([]);
  }

  public disposer = observe(this.observables, ({ object }) => {
    if (!object.entry) {
      return;
    }
    this.entry = object.entry;
    this.refreshEntryLikes(this.entry.id);
  });

  public userDisposer = observe(this.session, ({ object }) => {
    this.user = object.user;
  });

  public refreshEntryLikes(id: string) {
    this.loadingEntryLikes = true;
    likesBackend.entryLikes(id).then(payload => {
      this.entryLikesCount = payload.count;
      let users = payload.users.map(
        (userPayload: any) => new User(userPayload)
      );
      this.entryLikes = List(users);
      this.loadingEntryLikes = false;
    });
  }

  public refreshLikes() {
    this.loading = true;
    likesBackend.userLikes().then(userLikes => {
      let ids = userLikes.map((like: any) => like.id);
      let entries = userLikes.map((like: any) => new Entry(like));
      this.ids = Set(ids);
      this.userLikes = List(entries);
      this.userLikesCount = this.userLikes.size;
      this.loading = false;
    });
  }

  async unlike(entry: Entry) {
    this.ids = this.ids.delete(entry.id);
    let index = this.userLikes.findIndex(like => like.id === entry.id);
    this.userLikes = this.userLikes.delete(index);
    let unliked = await likesBackend.like(entry.id, false);
    if (!unliked) {
      this.ids = this.ids.add(entry.id);
      this.userLikes = this.userLikes.push(entry);
    }
    this.userLikesCount = this.userLikes.size;

    let userIndex = this.entryLikes.findIndex(like => like.id === this.user.id);
    this.entryLikes = this.entryLikes.delete(userIndex);
  }

  async like(entry: Entry) {
    this.ids = this.ids.add(entry.id);
    this.userLikes = this.userLikes.push(entry);
    let liked = await likesBackend.like(entry.id);
    if (!liked) {
      this.ids = this.ids.remove(entry.id);
      let index = this.userLikes.findIndex(like => like.id === entry.id);
      this.userLikes = this.userLikes.delete(index);
    }
    this.userLikesCount = this.userLikes.size;

    this.entryLikes = this.entryLikes.push(this.user);
  }

  public toggleLike(entry: Entry) {
    if (this.isEntryLiked(entry)) {
      return this.unlike(entry);
    }
    this.like(entry);
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
