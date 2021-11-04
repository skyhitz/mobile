import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Pressable } from 'react-native';
import Play from 'app/modules/ui/icons/play';
import Pause from 'app/modules/ui/icons/pause';
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
