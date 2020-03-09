import React from 'react';
import { View } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import { inject } from 'mobx-react';
import PlayerBar from 'app/modules/player/player-bar/PlayerBar';
import Colors from 'app/constants/Colors';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;
let BottomTabBarX: React.ComponentType<any> = BottomTabBar;

@inject((stores: Stores) => ({
  bottom: stores.playerStore.tabBarBottomPosition,
}))
export default class TabBarWrapper extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <View style={{ backgroundColor: Colors.tabsBackground }}>
        <PlayerBar />
        <BottomTabBarX
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
