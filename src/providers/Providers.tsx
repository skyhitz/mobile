import { Provider } from 'mobx-react';
import React from 'react';
import { playerStore, walletConnectStore } from 'app/src/stores';

export default function Providers(props) {
  return (
    <Provider playerStore={playerStore} walletConnectStore={walletConnectStore}>
      {props.children}
    </Provider>
  );
}
