import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Play from 'app/src/ui/icons/play';
import Pause from 'app/src/ui/icons/pause';
import cursorPointer from 'app/src/constants/CursorPointer';
import { PlayerStore } from 'app/src/stores/player';

export default () => {
  let { isPlaying, pauseAsync, playAsync } = PlayerStore();

  if (isPlaying()) {
    return (
      <Pressable
        style={[styles.playBtnWrapper, cursorPointer]}
        onPress={() => pauseAsync()}
      >
        <Pause size={22} color={'white'} />
      </Pressable>
    );
  }
  return (
    <Pressable
      style={[styles.playBtnWrapper, cursorPointer]}
      onPress={() => playAsync()}
    >
      <Play size={22} color={'white'} />
    </Pressable>
  );
};

let styles = StyleSheet.create({
  playBtnWrapper: {
    marginRight: 10,
  },
});
