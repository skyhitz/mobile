import { User } from '../models/user.model';
import { observable, observe, action } from 'mobx';
import { userBackend } from '../backends/user.backend';
import { SessionStore } from './session.store';
import { nftStorageApi, imagesGateway } from '../constants/constants';

export class EditProfileStore {
  @observable error: string | undefined | unknown;
  @observable avatarUrl: string | undefined;
  @observable displayName: string | undefined;
  @observable description: string | undefined;
  @observable username: string | undefined;
  @observable email: string | undefined;
  @observable profile: User | undefined;
  @observable loadingAvatar: boolean | undefined;
  disposer;

  constructor(public sessionStore: SessionStore) {
    this.disposer = observe(sessionStore.session, ({ object }) => {
      this.profile = object.user;
      if (!this.profile) {
        return;
      }
      let {
        avatarUrl,
        displayName,
        description,
        username,
        email,
      } = this.profile;
      this.avatarUrl = avatarUrl;
      this.displayName = displayName;
      this.description = description;
      this.username = username;
      this.email = email;
    });
  }

  async uploadProfilePhoto(image: any) {
    const isPng = image.uri.startsWith('data:image/png');
    if (!isPng) {
      this.error = 'Only png files supported!';
      return;
    }
    if (image.height !== image.width) {
      return (this.error = 'Only square images supported!');
    }
    const blobRes = await fetch(image.uri);
    const file = await blobRes.blob();
    if (!this.sessionStore.user) return;
    this.loadingAvatar = true;
    let res = await fetch(`${nftStorageApi}/upload`, {
      method: 'POST',
      body: file,
      headers: new Headers({
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY}`,
      }),
    });
    let { value, ok } = await res.json();

    if (ok) {
      this.updateAvatarUrl(`${imagesGateway}/${value.cid}`);
    }
    this.loadingAvatar = false;
  }

  @action
  updateAvatarUrl = (text: string) => {
    this.avatarUrl = text;
  };

  @action
  updateDisplayName = (text: string) => {
    this.displayName = text;
  };

  @action
  updateDescription = (text: string) => {
    this.description = text;
  };

  @action
  updateUsername = (text: string) => {
    this.username = text;
  };

  @action
  updateEmail = (text: string) => {
    this.email = text;
  };

  get validationError() {
    if (!this.avatarUrl) {
      return 'Upload a profile picture.';
    }

    if (!this.displayName) {
      return 'Add a display name.';
    }

    if (!this.description) {
      return 'Add a description.';
    }

    if (!this.username) {
      return 'Add a username.';
    }

    if (!this.email) {
      return 'Add an email.';
    }

    return null;
  }

  get canUpdate() {
    return (
      this.avatarUrl &&
      this.displayName &&
      this.description &&
      this.username &&
      this.email
    );
  }

  async updateProfile() {
    let user;
    try {
      user = await userBackend.updateUser(
        this.avatarUrl as string,
        this.displayName as string,
        this.description as string,
        this.username as string,
        this.email as string
      );
    } catch (e) {
      this.error = e;
      return;
    }
    if (user) {
      return await this.sessionStore.refreshUser();
    }
  }
}
