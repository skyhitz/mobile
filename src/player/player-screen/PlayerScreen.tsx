import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import ChevronDown from 'app/src/ui/icons/chevron-down';
import VideoPlayer from './video-player/VideoPlayer';
import PlayerEntryInfo from './PlayerEntryInfo';
import BuyBtn from 'app/src/ui/buy-btn/BuyBtn';
import PlayerControls from './player-controls/PlayerControls';
import LikersSection from './likers-section/LikersSection';
import Colors from 'app/src/constants/Colors';
import { observer } from 'mobx-react';
import { Stores } from 'app/src/functions/Stores';
import cursorPointer from 'app/src/constants/CursorPointer';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 16,
  },
  title: {
    color: 'white',
    padding: 16,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  song: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  artist: {
    color: 'white',
  },
  slider: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: width - 32,
    borderRadius: 2,
    height: 4,
    marginVertical: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default observer(() => {
  let { playerStore } = Stores();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable
          style={[styles.button, cursorPointer]}
          onPress={() => playerStore.hidePlayer()}
        >
          <ChevronDown size={24} color={Colors.white} />
        </Pressable>
      </View>
      <VideoPlayer />
      <PlayerEntryInfo />
      <BuyBtn entry={playerStore.entry} />
      <PlayerControls />
      <LikersSection />
    </SafeAreaView>
  );
});
