import { Provider } from 'mobx-react';
import React from 'react';
import {
  playerStore,
  entryStore,
  paymentsStore,
  walletConnectStore,
} from 'app/src/stores';

export default function Providers(props) {
  return (
    <Provider
      playerStore={playerStore}
      entryStore={entryStore}
      paymentsStore={paymentsStore}
      walletConnectStore={walletConnectStore}
    >
      {props.children}
    </Provider>
  );
}
