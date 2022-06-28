import { observable, computed } from 'mobx';

export class SignUpValidationStore {
  @observable usernameError: string = '';
  @observable usernameValid;
  @observable displayNameError: string = '';
  @observable displayNameValid;
  @observable emailError: string = '';
  @observable emailValid;
  @observable backendError: string = '';

  constructor() {}

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
      this.usernameError =
        'Usernames cannot have spaces or special characters.';
      return;
    }

    this.usernameError = '';
    return (this.usernameValid = true);
  }

  validateDisplayName(displayName: string) {
    if (!displayName) {
      this.displayNameValid = false;
      this.displayNameError = 'Display name is required.';
      return;
    }

    if (displayName.length < 2) {
      this.displayNameValid = false;
      this.displayNameError = 'Display name is minimum 2 characters.';
      return;
    }

    this.displayNameError = '';
    return (this.displayNameValid = true);
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

    this.emailError = '';
    return (this.emailValid = true);
  }

  @computed
  get error() {
    if (this.usernameError) {
      return this.usernameError;
    }

    if (this.displayNameError) {
      return this.displayNameError;
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
    return this.usernameValid && this.displayNameValid && this.emailValid;
  }

  setBackendError(error: string) {
    this.backendError = error;
  }
}
