import { observable, computed } from 'mobx';

export class UpdatePasswordValidationStore {
  @observable passwordError: string = '';
  @observable passwordValid: boolean = true;
  @observable passwordConfirmationError: string = '';
  @observable passwordConfirmationValid: boolean = true;
  @observable backendError: string = '';

  constructor() {}

  validatePassword(password: string) {
    if (!password) {
      this.passwordValid = false;
      this.passwordError = 'Password is required.';
      return;
    }

    if (password.length < 7) {
      this.passwordValid = false;
      this.passwordError = 'Password is minimum 8 characters.';
      return;
    }

    this.passwordError = '';
    return (this.passwordValid = true);
  }

  validatePasswordConfirmation(confirmationPassword: string, password: string) {
    if (!confirmationPassword) {
      this.passwordConfirmationValid = false;
      this.passwordConfirmationError = 'Confirmation password is required.';
      return;
    }

    if (confirmationPassword.length < 7) {
      this.passwordConfirmationValid = false;
      this.passwordConfirmationError =
        'Confirmation password is minimum 8 characters.';
      return;
    }

    if (confirmationPassword !== password) {
      this.passwordConfirmationValid = false;
      this.passwordConfirmationError = `Passwords don't match.`;
      return;
    }

    this.passwordConfirmationError = '';
    return (this.passwordConfirmationValid = true);
  }

  @computed
  get error() {
    if (this.passwordError) {
      return this.passwordError;
    }

    if (this.passwordConfirmationError) {
      return this.passwordConfirmationError;
    }

    if (this.backendError) {
      return this.backendError;
    }

    return null;
  }

  @computed
  get validForm() {
    return this.passwordConfirmationValid && this.passwordValid;
  }

  setBackendError(error: string) {
    this.backendError = error;
  }
}
