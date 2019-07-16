import { Provider } from 'mobx-react';
import React from 'react';
import {
  sessionStore,
  signUpValidationStore,
  signInValidationStore,
  resetPasswordValidationStore,
  updatePasswordValidationStore,
  usernameAndEmailValidationStore,
  playerStore,
  usersSearchStore,
  entriesSearchStore,
  inputSearchStore,
  profileStore,
  editProfileStore,
  likesStore,
  playlistsStore,
  entryStore,
  userEntriesStore,
  paymentsStore,
  userFavoritesStore,
} from 'skyhitz-common';

export default class Providers extends React.Component<any, any> {
  render() {
    return (
      <Provider
        sessionStore={sessionStore}
        signUpValidationStore={signUpValidationStore}
        signInValidationStore={signInValidationStore}
        usernameAndEmailValidationStore={usernameAndEmailValidationStore}
        resetPasswordValidationStore={resetPasswordValidationStore}
        updatePasswordValidationStore={updatePasswordValidationStore}
        playerStore={playerStore}
        inputSearchStore={inputSearchStore}
        usersSearchStore={usersSearchStore}
        entriesSearchStore={entriesSearchStore}
        profileStore={profileStore}
        editProfileStore={editProfileStore}
        likesStore={likesStore}
        playlistsStore={playlistsStore}
        entryStore={entryStore}
        userEntriesStore={userEntriesStore}
        paymentsStore={paymentsStore}
        userFavoritesStore={userFavoritesStore}
      >
        {this.props.children}
      </Provider>
    );
  }
}
