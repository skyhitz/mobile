import { Provider } from 'mobx-react';
import React from 'react';
import { playerStore, entryStore, walletConnectStore } from 'app/src/stores';

export default function Providers(props) {
  return (
    <Provider
      playerStore={playerStore}
      entryStore={entryStore}
      walletConnectStore={walletConnectStore}
    >
      {props.children}
    </Provider>
  );
}
