import { Provider } from 'mobx-react/native';
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
} from 'skyhitz-common';

export default class Providers extends React.Component {
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
      >
        {this.props.children}
      </Provider>
    );
  }
}
