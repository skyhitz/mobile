import { useRecoilValue } from 'recoil';
import * as L from 'list';
import { likesBackend } from '../api/likes';
import { userAtom } from '../atoms/atoms';
import { Entry, User } from '../models';

export const LikesStore = () => {
  let ids: Set<string> = new Set([]);
  let loading: boolean = false;
  let loadingEntryLikes: boolean = false;
  let entry!: Entry;
  let entryLikes: L.List<User> = L.from([]);
  let entryLikesCount!: number;
  let userLikes: L.List<Entry> = L.from([]);
  let userLikesCount!: number;

  const user = useRecoilValue(userAtom);

  let viewLimit: number = 8;
  let disposer: any;
  let userDisposer: any;

  const hasMoreLikers = () => {
    if (entryLikesCount > viewLimit) {
      return true;
    }
    return false;
  };

  const plusLikers = () => {
    return kFormatter(entryLikesCount - viewLimit);
  };

  const kFormatter = (num: number) => {
    return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
  };

  // TODO: wire up effects
  // constructor(
  //   public observables: IObservableObject,
  //   public session: IObservableObject
  // ) {
  //   this.disposer = observe(observables, ({ object }) => {
  //     if (!object.entry) {
  //       return;
  //     }
  //     this.entry = object.entry;
  //     this.refreshEntryLikes(this.entry.id);
  //   });

  //   this.userDisposer = observe(this.session, ({ object }) => {
  //     this.user = object.user;
  //   });
  // }

  const clearLikes = () => {
    entryLikes = L.from([]);
    userLikes = L.from([]);
  };

  const refreshEntryLikes = (id: string) => {
    loadingEntryLikes = true;
    likesBackend.entryLikes(id).then((payload) => {
      if (payload) {
        entryLikesCount = payload.count;
        let users = payload.users.map(
          (userPayload: any) => new User(userPayload)
        );
        entryLikes = L.from(users);
      }

      loadingEntryLikes = false;
    });
  };

  const refreshLikes = () => {
    loading = true;
    likesBackend.userLikes().then((userLikes) => {
      if (!userLikes) {
        return;
      } else {
        let ids = userLikes.map((like: any) => like.id);
        let entries = userLikes.map((like: any) => new Entry(like));
        ids = new Set(ids);
        userLikes = L.from(entries);
        userLikesCount = userLikes.length;
      }

      loading = false;
    });
  };

  const unlike = async (entry: Entry) => {
    ids.delete(entry.id);
    let index = L.findIndex((like) => {
      if (like) {
        return like.id === entry.id;
      }
      return false;
    }, userLikes);
    userLikes = L.remove(index, 1, userLikes);
    let unliked = await likesBackend.like(entry.id, false);
    if (!unliked) {
      ids = ids.add(entry.id);
      userLikes = L.append(entry, userLikes);
    }
    userLikesCount = userLikes.length;

    let userIndex = L.findIndex((like) => {
      if (like) {
        return like.id === user?.id;
      }
      return false;
    }, entryLikes);
    entryLikes = L.remove(userIndex, 1, entryLikes);
  };

  const like = async (entry: Entry) => {
    if (!user) return;
    ids = ids.add(entry.id);
    userLikes = L.append(entry, userLikes);
    let liked = await likesBackend.like(entry.id);
    if (!liked) {
      ids.delete(entry.id);
      let index = L.findIndex((like) => {
        if (like) {
          return like.id === entry.id;
        }
        return false;
      }, userLikes);
      userLikes = L.remove(index, 1, userLikes);
    }
    userLikesCount = userLikes.length;

    entryLikes = L.append(user, entryLikes);
  };

  const toggleLike = (entry: Entry) => {
    if (isEntryLiked(entry)) {
      return unlike(entry);
    }
    return like(entry);
  };

  const isLiked = () => {
    if (!entry) {
      return false;
    }
    return ids.has(entry.id);
  };

  const isEntryLiked = (entry: Entry) => {
    if (!entry) {
      return false;
    }
    return ids.has(entry.id);
  };

  return {
    toggleLike,
    isLiked,
    entryLikes,
    hasMoreLikers,
    plusLikers,
    userLikes,
    userLikesCount,
    loading,
    refreshLikes,
    isEntryLiked,
    clearLikes,
  };
};
