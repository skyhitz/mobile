import { Provider } from 'mobx-react';
import React from 'react';
import {
  signUpValidationStore,
  signInValidationStore,
  playerStore,
  usersSearchStore,
  entriesSearchStore,
  inputSearchStore,
  profileStore,
  entryStore,
  paymentsStore,
  walletConnectStore,
} from 'app/src/stores';

export default function Providers(props) {
  return (
    <Provider
      signUpValidationStore={signUpValidationStore}
      signInValidationStore={signInValidationStore}
      playerStore={playerStore}
      inputSearchStore={inputSearchStore}
      usersSearchStore={usersSearchStore}
      entriesSearchStore={entriesSearchStore}
      profileStore={profileStore}
      entryStore={entryStore}
      paymentsStore={paymentsStore}
      walletConnectStore={walletConnectStore}
    >
      {props.children}
    </Provider>
  );
}
