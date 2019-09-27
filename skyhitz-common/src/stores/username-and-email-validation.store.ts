import { observable, computed } from 'mobx';

export class UsernameAndEmailValidationStore {
  @observable usernameError: string;
  @observable usernameValid: boolean;
  @observable emailError: string;
  @observable emailValid: boolean;
  @observable backendError: string;

  constructor (
  ) {
  }

  validateUsername(username: string) {
    if (!username) {
      this.usernameValid = false;
      this.usernameError = 'Username is required.';
      return;
    }

    if (username.length < 2) {
      this.usernameValid = false;
      this.usernameError = 'Username is minimum 2 characters.';
      return;
    }

    let validRegex = /^[a-zA-Z0-9_-]+$/.test(username);
    if (!validRegex) {
      this.usernameValid = false;
      this.usernameError = 'Usernames cannot have spaces or special characters.';
      return;
    }

    this.usernameError = null;
    return this.usernameValid = true;
  }

  validateEmail(email: string) {
    if (!email) {
      this.emailValid = false;
      this.emailError = 'Email is required.';
      return;
    }

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      this.emailValid = false;
      this.emailError = 'Please enter a valid email.';
      return;
    }

    this.emailError = null;
    return this.emailValid = true;
  }

  @computed
  get error() {
    if (this.usernameError) {
      return this.usernameError;
    }

    if (this.emailError) {
      return this.emailError;
    }

    if (this.backendError) {
      return this.backendError;
    }

    return null;
  }

  @computed
  get validForm() {
    return this.usernameValid && this.emailValid;
  }

  setBackendError(error: string) {
    this.backendError = error;
  }

}
