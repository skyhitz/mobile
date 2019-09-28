import { observable, computed } from 'mobx';

export class SignInValidationStore {
  @observable
  usernameOrEmailError!: string;
  @observable
  usernameOrEmailValid!: boolean;
  @observable
  passwordError!: string;
  @observable
  passwordValid!: boolean;
  @observable
  backendError!: string;

  constructor() {}

  validateUsernameOrEmail(usernameOrEmail: string) {
    if (!usernameOrEmail) {
      this.usernameOrEmailValid = false;
      this.usernameOrEmailError = 'Username is required.';
      return;
    }

    if (usernameOrEmail.length < 2) {
      this.usernameOrEmailValid = false;
      this.usernameOrEmailError = 'Enter a valid username or email.';
      return;
    }

    this.usernameOrEmailError = '';
    return (this.usernameOrEmailValid = true);
  }

  validatePassword(password: string) {
    if (!password) {
      this.passwordValid = false;
      this.passwordError = 'Password is required.';
      return;
    }

    if (password.length < 7) {
      this.passwordValid = false;
      this.passwordError = 'Enter a valid password.';
      return;
    }

    this.passwordError = '';
    return (this.passwordValid = true);
  }

  @computed
  get error() {
    if (this.usernameOrEmailError) {
      return this.usernameOrEmailError;
    }

    if (this.passwordError) {
      return this.passwordError;
    }

    if (this.backendError) {
      return this.backendError;
    }

    return null;
  }

  @computed
  get validForm() {
    return this.usernameOrEmailValid && this.passwordValid;
  }

  setBackendError(error: string) {
    this.backendError = error;
  }
}
