import { observable, computed } from 'mobx';

export class SignInValidationStore {
  @observable
  usernameOrEmailError!: string;
  @observable
  usernameOrEmailValid!: boolean;
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

  @computed
  get error() {
    if (this.usernameOrEmailError) {
      return this.usernameOrEmailError;
    }

    if (this.backendError) {
      return this.backendError;
    }

    return null;
  }

  @computed
  get validForm() {
    return this.usernameOrEmailValid;
  }

  setBackendError(error: string) {
    debugger;
    this.backendError = error;
  }
}
