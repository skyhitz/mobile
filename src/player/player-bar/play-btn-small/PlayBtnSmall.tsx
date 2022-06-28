import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Pressable } from 'react-native';
import Play from 'app/src/ui/icons/play';
import Pause from 'app/src/ui/icons/pause';
import { Stores } from 'app/src/functions/Stores';
import cursorPointer from 'app/src/constants/CursorPointer';

export default observer(() => {
  let { playerStore } = Stores();

  if (playerStore.isPlaying) {
    return (
      <Pressable
        style={[styles.playBtnWrapper, cursorPointer]}
        onPress={() => playerStore.pauseAsync()}
      >
        <Pause size={22} color={'white'} />
      </Pressable>
    );
  }
  return (
    <Pressable
      style={[styles.playBtnWrapper, cursorPointer]}
      onPress={() => playerStore.playAsync()}
    >
      <Play size={22} color={'white'} />
    </Pressable>
  );
});

let styles = StyleSheet.create({
  playBtnWrapper: {
    marginRight: 10,
  },
});
