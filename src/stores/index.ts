import { SignUpValidationStore } from './sign-up-validation.store';
import { SignInValidationStore } from './sign-in-validation.store';
import { PlayerStore } from './player.store';
import { InputSearchStore } from './input-search.store';
import { EntriesSearchStore } from './entries-search.store';
import { UsersSearchStore } from './users-search.store';
import { ProfileStore } from './profile.store';
import { PaymentsStore } from './payments.store';
import { EntryStore } from './entry.store';
import { WalletConnectStore } from './wallet-connect.store';

export const signUpValidationStore = new SignUpValidationStore();
export const signInValidationStore = new SignInValidationStore();
export const playerStore = new PlayerStore();
export const inputSearchStore = new InputSearchStore();
export const entriesSearchStore = new EntriesSearchStore(
  inputSearchStore.query
);
export const usersSearchStore = new UsersSearchStore(inputSearchStore.query);
export const profileStore = new ProfileStore();
export const paymentsStore = new PaymentsStore();
export const entryStore = new EntryStore();
export const walletConnectStore = new WalletConnectStore();

export type Stores = {
  signInValidationStore: SignInValidationStore;
  signUpValidationStore: SignUpValidationStore;
  playerStore: PlayerStore;
  inputSearchStore: InputSearchStore;
  entriesSearchStore: EntriesSearchStore;
  usersSearchStore: UsersSearchStore;
  profileStore: ProfileStore;
  paymentsStore: PaymentsStore;
  entryStore: EntryStore;
  walletConnectStore: WalletConnectStore;
};
