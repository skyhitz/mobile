import React from 'react';
import { inject } from 'mobx-react/native';
import { BlurView } from 'expo';
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

@inject(stores => ({
  entry: stores.playerStore.entry,
}))
export default class PlayerScreen extends React.Component {
  render() {
    let source = PlaceholderBackground;
    if (this.props.entry) {
      source = { uri: this.props.entry.imageUrl };
    }
    return (
      <ImageBackground style={StyleSheet.absoluteFill} source={source}>
        <BlurView
          blurType="dark"
          intensity={100}
          style={StyleSheet.absoluteFill}
        >
          <View style={styles.container}>
            <PlayerNav />
            <VideoPlayer />
            <PlayerEntryInfo />
            <PlayerControls />
            <LikersSection />
          </View>
        </BlurView>
      </ImageBackground>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.53)',
    flex: 1,
    justifyContent: 'space-between',
  },
});
