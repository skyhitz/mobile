import { Payload } from './payload.model';

export class EntryPayload extends Payload {
  imageUrl?: string;
  userId?: number;
  commentCount?: number;
  description?: string;
  likeCount?: number;
  publishedAt?: string;
  ranking?: number;
  shareCount?: number;
  title?: string;
  id!: string;
  videoUrl?: string;
  forSale?: boolean;
  price?: number;
}

export class Entry extends EntryPayload {
  constructor(payload: EntryPayload) {
    super(payload);
    this.imageUrl = payload.imageUrl;
    this.userId = payload.userId;
    this.commentCount = payload.commentCount;
    this.description = payload.description;
    this.likeCount = payload.likeCount;
    this.publishedAt = payload.publishedAt;
    this.ranking = payload.ranking;
    this.shareCount = payload.shareCount;
    this.title = payload.title;
    this.id = payload.id;
    this.videoUrl = payload.videoUrl;
    this.forSale = payload.forSale;
    this.price = payload.price;
  }

  get cloudinaryPublicId() {
    let prefix = 'app';
    let popSection = this.videoUrl
      ? this.videoUrl.split(`/${prefix}`).pop()
      : '';
    let lastSection = popSection ? popSection.split('.')[0] : '';
    return `${prefix}${lastSection}`;
  }
}
