import { observable, computed } from 'mobx';

export class ResetPasswordValidationStore {
  @observable emailError: string | undefined;
  @observable emailValid: boolean | undefined;
  @observable backendError: string | undefined;

  constructor() {}

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

    delete this.emailError;
    return (this.emailValid = true);
  }

  @computed
  get error() {
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
    return this.emailValid;
  }

  setBackendError(error: string) {
    this.backendError = error;
  }
}
