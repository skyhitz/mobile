import React from 'react';
import { View } from 'react-native';
import Layout from 'app/constants/Layout';
import { inject } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores:Stores) => ({
  hideTabPlayer: stores.playerStore.hideTabPlayer,
}))
export default class BottomPlaceholder extends React.Component<any, any> {
  render() {
    return (
      <View
        style={{
          height: this.props.hideTabPlayer ? 0 : 40,
          backgroundColor: 'transparent',
          width: Layout.window.width,
        }}
      />
    );
  }
}
