import { User } from '../models/user.model';
import { entriesBackend } from '../backends/entries.backend';
import { observable, observe, action } from 'mobx';
import { userBackend } from '../backends/user.backend';
import { SessionStore } from './session.store';
import { preBase64String, cloudinaryApiPath } from '../constants/constants';

export class EditProfileStore {
  @observable error: string;
  @observable avatarUrl: string;
  @observable displayName: string;
  @observable description: string;
  @observable username: string;
  @observable email: string;
  @observable phone: string;
  @observable profile: User;
  @observable loadingAvatar: boolean;

  constructor(public sessionStore: SessionStore) {}

  public disposer = observe(this.sessionStore.session, ({ object }) => {
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
      phone
    } = this.profile;
    this.avatarUrl = avatarUrl;
    this.displayName = displayName;
    this.description = description;
    this.username = username;
    this.email = email;
    this.phone = phone;
  });

  async uploadProfilePhoto(image: any) {
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
  }

  @action
  updateDisplayName = (text: string) => {
    this.displayName = text;
  }

  @action
  updateDescription = (text: string) => {
    this.description = text;
  }

  @action
  updateUsername = (text: string) => {
    this.username = text;
  }

  @action
  updateEmail = (text: string) => {
    this.email = text;
  }

  @action
  updatePhone = (text: string) => {
    this.phone = text;
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
        this.avatarUrl,
        this.displayName,
        this.description,
        this.username,
        this.email,
        this.phone
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
