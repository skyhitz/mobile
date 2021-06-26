import { User } from '../models/user.model';
import { observable, observe, action } from 'mobx';
import { userBackend } from '../backends/user.backend';
import { SessionStore } from './session.store';
import { preBase64String, cloudinaryApiPath } from '../constants/constants';

export class EditProfileStore {
  @observable error: string | undefined;
  @observable avatarUrl: string | undefined;
  @observable displayName: string | undefined;
  @observable description: string | undefined;
  @observable username: string | undefined;
  @observable email: string | undefined;
  @observable phone: string | undefined;
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
        phone,
      } = this.profile;
      this.avatarUrl = avatarUrl;
      this.displayName = displayName;
      this.description = description;
      this.username = username;
      this.email = email;
      this.phone = phone;
    });
  }

  async uploadProfilePhoto(image: any) {
    if (!this.sessionStore.user) return;
    this.loadingAvatar = true;
    let data = new FormData();
    data.append('file', `${preBase64String}${image.base64}`);
    data.append('folder', `/app/${this.sessionStore.user.username}/images`);
    let res = await fetch(cloudinaryApiPath, { method: 'POST', body: data });
    let { secure_url } = await res.json();
    this.updateAvatarUrl(secure_url);
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

  @action
  updatePhone = (text: string) => {
    this.phone = text;
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
        this.email as string,
        this.phone as string
      );
      await userBackend.updateAlgoliaEntriesWithUser();
    } catch (e) {
      this.error = e;
      return;
    }
    if (user) {
      return await this.sessionStore.refreshUser();
    }
  }
}
