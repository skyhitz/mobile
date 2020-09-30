import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { observer } from 'mobx-react';
import { Feather } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';
import cursorPointer from 'app/constants/CursorPointer';

export default observer(() => {
  let { playerStore } = Stores();

  if (playerStore.loop) {
    return (
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={() => playerStore.toggleLoop()}
      >
        <Feather name="repeat" size={20} color={Colors.lightBrandBlue} />
      </Pressable>
    );
  }
  return (
    <Pressable
      style={[styles.controlTouch, cursorPointer]}
      onPress={() => playerStore.toggleLoop()}
    >
      <Feather name="repeat" size={20} color={Colors.white} />
    </Pressable>
  );
});

var styles = StyleSheet.create({
  controlTouch: {
    alignSelf: 'center',
  },
  loopBtn: {
    width: 21,
    height: 16.5,
  },
});
