import { Provider } from 'mobx-react';
import React from 'react';
import {
  sessionStore,
  signUpValidationStore,
  signInValidationStore,
  usernameAndEmailValidationStore,
  playerStore,
  usersSearchStore,
  entriesSearchStore,
  inputSearchStore,
  profileStore,
  editProfileStore,
  likesStore,
  entryStore,
  userEntriesStore,
  paymentsStore,
  walletConnectStore,
} from 'app/src/stores';

export default function Providers(props) {
  return (
    <Provider
      sessionStore={sessionStore}
      signUpValidationStore={signUpValidationStore}
      signInValidationStore={signInValidationStore}
      usernameAndEmailValidationStore={usernameAndEmailValidationStore}
      playerStore={playerStore}
      inputSearchStore={inputSearchStore}
      usersSearchStore={usersSearchStore}
      entriesSearchStore={entriesSearchStore}
      profileStore={profileStore}
      editProfileStore={editProfileStore}
      likesStore={likesStore}
      entryStore={entryStore}
      userEntriesStore={userEntriesStore}
      paymentsStore={paymentsStore}
      walletConnectStore={walletConnectStore}
    >
      {props.children}
    </Provider>
  );
}
