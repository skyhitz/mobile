import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import SkipForwardIcon from 'app/src/ui/icons/skip-forward';
import cursorPointer from 'app/src/constants/CursorPointer';
import Colors from 'app/src/constants/Colors';
import { PlayerStore } from 'app/src/stores/player';

const ForwardBtn = ({ size = 24 }) => {
  const { playNext } = PlayerStore();

  return (
    <Pressable
      style={[styles.controlTouch, cursorPointer]}
      onPress={() => playNext()}
    >
      <SkipForwardIcon size={size} color={Colors.white} />
    </Pressable>
  );
};

export default ForwardBtn;

var styles = StyleSheet.create({
  controlTouch: {
    alignSelf: 'center',
  },
  forwardBtn: {
    width: 24,
    height: 18,
  },
});
