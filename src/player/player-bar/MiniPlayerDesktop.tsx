import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import LoopBtn from '../player-screen/loop-btn/LoopBtn';
import PrevBtn from '../player-screen/prev-btn/PrevBtn';
import PlayBtn from '../player-screen/play-btn/PlayDesktopBtn';
import ForwardBtn from '../player-screen/forward-btn/ForwardBtn';
import ShuffleBtn from '../player-screen/shuffle-btn/ShuffleBtn';
import {
  CurrentTimeDisplay,
  DurationDisplay,
} from '../player-screen/video-player/VideoTimeDisplay';
import Slider from '../player-screen/slider/Slider';
import VideoComponent from '../player-screen/video-player/VideoComponent';
import Colors from 'app/src/constants/Colors';
import { PlayerStore } from 'app/src/stores/player';

export default () => {
  let { entry } = PlayerStore();
  return (
    <View style={styles.desktopWrap}>
      <View style={styles.videoWrap}>
        <VideoComponent desktop={true} />
        <View style={styles.infoWrap}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {entry?.title}
          </Text>
          <Text
            style={styles.artistName}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {entry?.artist}
          </Text>
        </View>
      </View>
      <View style={styles.controlsWrap}>
        <View style={styles.rowControls}>
          <ShuffleBtn size={14} />
          <PrevBtn size={18} />
          <PlayBtn size={22} />
          <ForwardBtn size={18} />
          <LoopBtn size={14} />
        </View>
        <View style={styles.sliderControls}>
          <CurrentTimeDisplay />
          <Slider />
          <DurationDisplay />
        </View>
      </View>
      <View style={styles.videoWrap} />
    </View>
  );
};

let styles = StyleSheet.create({
  rowControls: {
    maxWidth: 240,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  sliderControls: {
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  controlsWrap: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minWidth: 400,
  },
  videoWrap: {
    padding: 15,
    width: 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  desktopWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(41, 43, 51, 0.95)',
    height: 80,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
  infoWrap: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
    paddingLeft: 15,
  },
  title: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
    color: Colors.defaultTextDark,
  },
  artistName: {
    fontSize: 12,
    textAlign: 'left',
    marginTop: Platform.OS === 'ios' ? 3 : 2,
    color: Colors.grey,
  },
});
