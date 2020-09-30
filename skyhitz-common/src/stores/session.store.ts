import { observable, observe, computed, IObservableObject } from 'mobx';
import { User } from '../models';
import { userBackend } from '../backends/user.backend';
import { forceSignOut } from '../backends/apollo-client.backend';
import { SignUpForm, SignInForm } from '../types';
import AsyncStorage from '@react-native-community/async-storage';

export class SessionStore {
  public session: { user: User | null } & IObservableObject = observable({
    user: null,
  });
  @computed
  get user() {
    return this.session.user;
  }
  constructor() {}

  async signUp(signUp: SignUpForm) {
    let userPayload = await userBackend.signUp(signUp);
    await this.setUser(userPayload);
    return (this.session.user = new User(userPayload));
  }

  async signIn(signIn: SignInForm) {
    let userPayload = await userBackend.signIn(signIn);
    await this.setUser(userPayload);
    return (this.session.user = new User(userPayload));
  }

  async setUser(value: any) {
    value = JSON.stringify(value);
    if (value) return AsyncStorage.setItem('userData', value);
    else console.info('not set, stringify failed:', 'userData', value);
  }

  public forceSignOutDisposer = observe(forceSignOut, ({ object }) => {
    if (object.value) {
      this.signOut();
    }
  });

  async signOut() {
    this.session.user = null;
    return await AsyncStorage.removeItem('userData');
  }

  async loadSession() {
    return await this.loadFromStorage();
  }

  async loadFromStorage() {
    try {
      let userPayload = await AsyncStorage.getItem('userData');
      if (userPayload) {
        this.session.user = new User(JSON.parse(userPayload));
        return this.session.user;
      }
    } catch (e) {
      console.info(e);
    }

    return await this.signOut();
  }

  async refreshUser() {
    if (!this.session.user) {
      return await this.signOut();
    }
    try {
      let userPayload = await userBackend.getAuthenticatedUser();
      if (userPayload) {
        let userPayloadClone = Object.assign({}, userPayload);
        userPayloadClone.jwt = this.session.user.jwt;
        await this.setUser(userPayloadClone);
        this.session.user = new User(userPayloadClone);
        return this.session.user;
      }
    } catch (e) {
      console.info(e);
    }
    return await this.signOut();
  }

  async sendResetEmail(email: string) {
    return userBackend.sendResetEmail(email);
  }

  async updatePassword(token: string, password: string) {
    let userPayload = await userBackend.updatePassword(token, password);
    await this.setUser(userPayload);
    return (this.session.user = new User(userPayload));
  }
}
