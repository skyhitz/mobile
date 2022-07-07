import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import ShuffleIcon from 'app/src/ui/icons/shuffle';
import Colors from 'app/src/constants/Colors';
import cursorPointer from 'app/src/constants/CursorPointer';
import { PlayerStore } from 'app/src/stores/player';

const ShuffleBtn = ({ size = 20 }) => {
  const { toggleShuffle, shuffle } = PlayerStore();
  if (shuffle) {
    return (
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={() => toggleShuffle()}
      >
        <ShuffleIcon size={size} color={Colors.lightBrandBlue} />
      </Pressable>
    );
  }
  return (
    <Pressable
      style={[styles.controlTouch, cursorPointer]}
      onPress={() => toggleShuffle()}
    >
      <ShuffleIcon size={size} color={Colors.white} />
    </Pressable>
  );
};

export default ShuffleBtn;

var styles = StyleSheet.create({
  controlTouch: {
    alignSelf: 'center',
  },
});
