import { Provider } from 'mobx-react';
import React from 'react';
import {
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
