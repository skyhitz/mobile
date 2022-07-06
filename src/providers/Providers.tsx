import { Provider } from 'mobx-react';
import React from 'react';
import { playerStore } from 'app/src/stores';

export default function Providers(props) {
  return <Provider playerStore={playerStore}>{props.children}</Provider>;
}
