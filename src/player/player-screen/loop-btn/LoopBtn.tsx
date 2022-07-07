import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import LoopIcon from 'app/src/ui/icons/repeat';
import Colors from 'app/src/constants/Colors';
import cursorPointer from 'app/src/constants/CursorPointer';
import { PlayerStore } from 'app/src/stores/player';

export default ({ size = 20 }) => {
  const { toggleLoop, loop } = PlayerStore();

  if (loop) {
    return (
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={() => toggleLoop()}
      >
        <LoopIcon size={size} color={Colors.lightBrandBlue} />
      </Pressable>
    );
  }
  return (
    <Pressable
      style={[styles.controlTouch, cursorPointer]}
      onPress={() => toggleLoop()}
    >
      <LoopIcon size={size} color={Colors.white} />
    </Pressable>
  );
};

var styles = StyleSheet.create({
  controlTouch: {
    alignSelf: 'center',
  },
});
