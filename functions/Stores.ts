import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

export function Stores() {
  return React.useContext(MobXProviderContext) as Stores;
}
