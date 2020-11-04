import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { observer } from 'mobx-react';
import { Feather } from '@expo/vector-icons';
import {
  ReplayIcon,
  Spinner,
} from 'app/modules/player/player-screen/video-player/VideoIcons';
import { Stores } from 'app/functions/Stores';
import cursorPointer from 'app/constants/CursorPointer';

export default observer(() => {
  let { playerStore } = Stores();

  if (playerStore.playbackState === 'PAUSED') {
    return (
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={() => playerStore.togglePlay()}
      >
        <View style={styles.containerWrap}>
          <View style={styles.playBtnCircle}>
            <Feather
              style={{ paddingLeft: 6 }}
              name="play"
              size={24}
              color="white"
            />
          </View>
        </View>
      </Pressable>
    );
  }
  if (playerStore.playbackState === 'PLAYING') {
    return (
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={() => playerStore.togglePlay()}
      >
        <View style={styles.containerWrap}>
          <View style={styles.playBtnCircle}>
            <Feather
              style={{ paddingLeft: 1, textAlign: 'center' }}
              name="pause"
              size={24}
              color="white"
            />
          </View>
        </View>
      </Pressable>
    );
  }
  if (playerStore.playbackState === 'ENDED') {
    return (
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={() => playerStore.replay()}
      >
        <View style={styles.containerWrap}>
          <View style={styles.playBtnCircle}>
            <ReplayIcon />
          </View>
        </View>
      </Pressable>
    );
  }
  return (
    <View style={styles.containerWrap}>
      <View style={styles.loadingSpinner}>
        <Spinner />
      </View>
    </View>
  );
});

var styles = StyleSheet.create({
  controlTouch: {
    alignSelf: 'center',
  },
  containerWrap: {
    width: 104,
    height: 90.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtnCircle: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingSpinner: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
