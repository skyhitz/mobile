import React from 'react';
import { inject } from 'mobx-react';
import PlayerNav from 'app/modules/player/player-screen/PlayerNav';
import VideoPlayer from 'app/modules/player/player-screen/video-player/VideoPlayer';
import PlayerControls from 'app/modules/player/player-screen/player-controls/PlayerControls';
import PlayerEntryInfo from 'app/modules/player/player-screen/PlayerEntryInfo';
import { StyleSheet, View } from 'react-native';
import { PlaceholderBackground } from 'app/assets/images/Images';
import LikersSection from 'app/modules/player/player-screen/likers-section/LikersSection';
import { Stores } from 'skyhitz-common';
import Colors from 'app/constants/Colors';
import BuyBtn from 'app/modules/ui/buy-btn/BuyBtn';

@inject((stores: Stores) => ({
  entry: stores.playerStore.entry,
}))
export default class PlayerScreen extends React.Component<any, any> {
  render() {
    let source = PlaceholderBackground;
    if (this.props.entry) {
      source = { uri: this.props.entry.imageUrl };
    }
    return (
      <View style={styles.container}>
        <PlayerNav />
        <VideoPlayer />
        <PlayerEntryInfo />
        <BuyBtn />
        <PlayerControls />
        <LikersSection />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1,
    justifyContent: 'space-between',
  },
});
