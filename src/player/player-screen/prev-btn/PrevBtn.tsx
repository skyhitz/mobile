import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import SkipBackwardIcon from 'app/src/ui/icons/skip-backward';
import cursorPointer from 'app/src/constants/CursorPointer';
import { PlayerStore } from 'app/src/stores/player';

const PrevBtn = ({ size = 24 }) => {
  const { playPrev } = PlayerStore();
  return (
    <Pressable
      style={[styles.controlTouch, cursorPointer]}
      onPress={() => playPrev()}
    >
      <SkipBackwardIcon size={size} color="white" />
    </Pressable>
  );
};

export default PrevBtn;

var styles = StyleSheet.create({
  controlTouch: {
    alignSelf: 'center',
  },
  prevBtn: {
    width: 24,
    height: 18,
  },
});
