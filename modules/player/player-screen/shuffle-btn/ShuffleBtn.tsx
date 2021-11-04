import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { inject } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
import ShuffleIcon from 'app/modules/ui/icons/shuffle';
import Colors from 'app/constants/Colors';
import cursorPointer from 'app/constants/CursorPointer';
type Stores = typeof stores;

const ShuffleBtn = inject((stores: Stores) => ({
  toggleShuffle: stores.playerStore.toggleShuffle.bind(stores.playerStore),
  shuffle: stores.playerStore.shuffle,
}))(({ toggleShuffle, shuffle, size = 20 }: any) => {
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
});

export default ShuffleBtn;

var styles = StyleSheet.create({
  controlTouch: {
    alignSelf: 'center',
  },
});
