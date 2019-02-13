import React from 'react';
import { View } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import { inject } from 'mobx-react/native';
import PlayerBar from 'app/modules/player/player-bar/PlayerBar';
import Colors from 'app/constants/Colors';

@inject(stores => ({
  bottom: stores.playerStore.tabBarBottomPosition,
}))
export default class TabBarWrapper extends React.Component {
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
          }}
        />
      </View>
    );
  }
}
