import { SessionStore } from './session.store';
import { SignUpValidationStore } from './sign-up-validation.store';
import { SignInValidationStore } from './sign-in-validation.store';
import { ResetPasswordValidationStore } from './reset-password-validation.store';
import { UpdatePasswordValidationStore } from './update-password-validation.store';
import { UsernameAndEmailValidationStore } from './username-and-email-validation.store';
import { PlayerStore } from './player.store';
import { InputSearchStore } from './input-search.store';
import { EntriesSearchStore } from './entries-search.store';
import { UsersSearchStore } from './users-search.store';
import { ProfileStore } from './profile.store';
import { EditProfileStore } from './edit-profile.store';
import { LikesStore } from './likes.store';
import { PlaylistsStore } from './playlists.store';
import { PaymentsStore } from './payments.store';
import { EntryStore } from './entry.store';
import { UserEntriesStore } from './user-entries.store';
import { UserFavoritesStore } from './user-favorites.store';

export const sessionStore = new SessionStore();
export const signUpValidationStore = new SignUpValidationStore();
export const signInValidationStore = new SignInValidationStore();
export const resetPasswordValidationStore = new ResetPasswordValidationStore();
export const updatePasswordValidationStore = new UpdatePasswordValidationStore();
export const usernameAndEmailValidationStore = new UsernameAndEmailValidationStore();
export const playerStore = new PlayerStore();
export const inputSearchStore = new InputSearchStore();
export const entriesSearchStore = new EntriesSearchStore(
  inputSearchStore.query
);
export const usersSearchStore = new UsersSearchStore(inputSearchStore.query);
export const profileStore = new ProfileStore();
export const editProfileStore = new EditProfileStore(sessionStore);
export const likesStore = new LikesStore(
  playerStore.observables,
  sessionStore.session
);
export const playlistsStore = new PlaylistsStore(sessionStore);
export const paymentsStore = new PaymentsStore();
export const entryStore = new EntryStore(sessionStore);
export const userEntriesStore = new UserEntriesStore(sessionStore);
export const userFavoritesStore = new UserFavoritesStore(
  playerStore.observables,
  paymentsStore
);

export type Stores = {
  sessionStore: SessionStore;
  signInValidationStore: SignInValidationStore;
  signUpValidationStore: SignUpValidationStore;
  resetPasswordValidationStore: ResetPasswordValidationStore;
  updatePasswordValidationStore: UpdatePasswordValidationStore;
  usernameAndEmailValidationStore: UsernameAndEmailValidationStore;
  playerStore: PlayerStore;
  inputSearchStore: InputSearchStore;
  entriesSearchStore: EntriesSearchStore;
  usersSearchStore: UsersSearchStore;
  profileStore: ProfileStore;
  editProfileStore: EditProfileStore;
  likesStore: LikesStore;
  playlistsStore: PlaylistsStore;
  paymentsStore: PaymentsStore;
  entryStore: EntryStore;
  userEntriesStore: UserEntriesStore;
  userFavoritesStore: UserFavoritesStore;
};
