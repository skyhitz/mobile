import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stores } from 'app/functions/Stores';
import cursorPointer from 'app/constants/CursorPointer';

export default observer(() => {
  let { playerStore } = Stores();

  if (playerStore.isPlaying) {
    return (
      <Pressable
        style={[styles.playBtnWrapper, cursorPointer]}
        onPress={() => playerStore.pauseAsync()}
      >
        <Feather name="pause" size={18} color="white" />
      </Pressable>
    );
  }
  return (
    <Pressable
      style={[styles.playBtnWrapper, cursorPointer]}
      onPress={() => playerStore.playAsync()}
    >
      <Feather name="play" size={18} color="white" />
    </Pressable>
  );
});

let styles = StyleSheet.create({
  playBtnWrapper: {
    width: 39,
    height: 39,
    justifyContent: 'center',
  },
  playBtn: {
    width: 15,
    height: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});
