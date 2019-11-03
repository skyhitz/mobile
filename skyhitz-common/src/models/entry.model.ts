import { Payload } from './payload.model';

export class EntryPayload extends Payload {
  userDisplayName?: string;
  userUsername?: string;
  imageUrl?: string;
  userId?: number;
  commentCount?: number;
  description?: string;
  likeCount?: number;
  publishedAt?: string;
  ranking?: number;
  shareCount?: number;
  title?: string;
  id?: string;
  videoUrl?: string;
  forSale?: boolean;
  price?: number;
}

export class Entry extends EntryPayload {
  constructor(payload: EntryPayload) {
    super(payload);
  }

  get cloudinaryPublicId() {
    let prefix = 'app';
    let lastSection = this.videoUrl
      .split(`/${prefix}`)
      .pop()
      .split('.')[0];
    return `${prefix}${lastSection}`;
  }
}
