import React from 'react';
import { inject } from 'mobx-react';
import PlayerNav from 'app/modules/player/player-screen/PlayerNav';
import VideoPlayer from 'app/modules/player/player-screen/video-player/VideoPlayer';
import PlayerControls from 'app/modules/player/player-screen/player-controls/PlayerControls';
import PlayerEntryInfo from 'app/modules/player/player-screen/PlayerEntryInfo';
import { StyleSheet, View } from 'react-native';
import LikersSection from 'app/modules/player/player-screen/likers-section/LikersSection';
import Colors from 'app/constants/Colors';
import BuyBtn from 'app/modules/ui/buy-btn/BuyBtn';

export default class PlayerScreen extends React.Component<any, any> {
  render() {
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
