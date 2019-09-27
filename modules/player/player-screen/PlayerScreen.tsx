import React from 'react';
import { inject } from 'mobx-react';
import PlayerNav from 'app/modules/player/player-screen/PlayerNav';
import VideoPlayer from 'app/modules/player/player-screen/video-player/VideoPlayer';
import PlayerControls from 'app/modules/player/player-screen/player-controls/PlayerControls';
import PlayerEntryInfo from 'app/modules/player/player-screen/PlayerEntryInfo';
import Divider from 'app/modules/ui/Divider';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import {
  videoHeight,
  videoWidth,
} from 'app/modules/player/player-screen/video-player/VideoConstants';
import { PlaceholderBackground } from 'app/assets/images/Images';
import LikeBtn from 'app/modules/player/player-screen/like-btn/LikeBtn';
import LikersSection from 'app/modules/player/player-screen/likers-section/LikersSection';
import StarBtn from 'app/modules/player/player-screen/star-btn/StarBtn';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;
import Colors from 'app/constants/Colors';

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
        <StarBtn />
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
