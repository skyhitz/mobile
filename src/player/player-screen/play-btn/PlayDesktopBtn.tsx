import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import PlayIcon from 'app/src/ui/icons/play';
import PauseIcon from 'app/src/ui/icons/pause';

import {
  ReplayIcon,
  Spinner,
} from 'app/src/player/player-screen/video-player/VideoIcons';
import cursorPointer from 'app/src/constants/CursorPointer';
import { PlayerStore } from 'app/src/stores/player';

export default ({ size = 28 }) => {
  let { togglePlay, playbackState, replay } = PlayerStore();

  if (playbackState === 'PAUSED') {
    return (
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={() => togglePlay()}
      >
        <View style={styles.containerWrap}>
          <View style={styles.playBtnCircle}>
            <PlayIcon size={size} color="white" />
          </View>
        </View>
      </Pressable>
    );
  }
  if (playbackState === 'PLAYING') {
    return (
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={() => togglePlay()}
      >
        <View style={styles.containerWrap}>
          <View style={styles.playBtnCircle}>
            <PauseIcon size={size} color="white" />
          </View>
        </View>
      </Pressable>
    );
  }
  if (playbackState === 'ENDED') {
    return (
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={() => replay()}
      >
        <View style={styles.containerWrap}>
          <View style={styles.playBtnCircle}>
            <ReplayIcon size={size} />
          </View>
        </View>
      </Pressable>
    );
  }
  return (
    <View style={styles.containerWrap}>
      <View style={styles.loadingSpinner}>
        <Spinner size={size} />
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  controlTouch: {
    alignSelf: 'center',
  },
  containerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtnCircle: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingSpinner: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
