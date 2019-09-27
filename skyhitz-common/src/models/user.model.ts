import { Payload } from './payload.model';

class UserPayload extends Payload {
  avatarUrl?: string;
  bannerUrl?: string;
  displayName?: string;
  email?: string;
  reputation?: number;
  publishedAt?: string;
  username?: string;
  id?: string;
  userType?: number;
  jwt?: string;
  phone?: string;
  description?: string;
}

export class User extends UserPayload {
  constructor(payload: UserPayload) {
    super(payload);
  }

  get isYoutubeChannel(): boolean {
    return this.userType === 0;
  }

  get initials() {
    let initialsArr = this.displayName.split(' ');
    let firstInitial = initialsArr[0].substr(0, 1).toUpperCase();
    let secondInitial = initialsArr[1]
      ? initialsArr[1].substr(0, 1).toUpperCase()
      : '';
    let initials = firstInitial + secondInitial;
    return initials;
  }
}
