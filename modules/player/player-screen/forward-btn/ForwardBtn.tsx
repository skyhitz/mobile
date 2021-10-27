import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { inject } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
import SkipForwardIcon from 'app/modules/ui/icons/skip-forward';
import cursorPointer from 'app/constants/CursorPointer';
type Stores = typeof stores;

const ForwardBtn = inject((stores: Stores) => ({
  playNext: stores.playerStore.playNext.bind(stores.playerStore),
}))(({ playNext, size = 24 }: any) => (
  <Pressable
    style={[styles.controlTouch, cursorPointer]}
    onPress={() => playNext()}
  >
    <SkipForwardIcon size={size} />
  </Pressable>
));

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
