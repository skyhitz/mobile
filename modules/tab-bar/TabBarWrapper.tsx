import React from 'react';
import { View } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import { inject } from 'mobx-react';
import PlayerBar from 'app/modules/player/player-bar/PlayerBar';
import Colors from 'app/constants/Colors';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  bottom: stores.playerStore.tabBarBottomPosition,
}))
export default class TabBarWrapper extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <PlayerBar />
        <BottomTabBar
          {...this.props}
          style={{
            bottom: this.props.bottom,
            backgroundColor: Colors.tabsBackground,
            borderTopColor: Colors.lightBrandBlue,
            borderTopWidth: 1,
          }}
        />
      </View>
    );
  }
}
