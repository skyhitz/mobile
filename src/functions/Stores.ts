import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import * as stores from 'app/src/stores';
type Stores = typeof stores;
import 'mobx-react-lite/batchingForReactDom';

export function Stores() {
  return React.useContext(MobXProviderContext) as Stores;
}
