import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { inject } from 'mobx-react';
import * as stores from 'app/src/stores';
import SkipForwardIcon from 'app/src/ui/icons/skip-forward';
import cursorPointer from 'app/src/constants/CursorPointer';
import Colors from 'app/src/constants/Colors';
type Stores = typeof stores;

const ForwardBtn = inject((stores: Stores) => ({
  playNext: stores.playerStore.playNext.bind(stores.playerStore),
}))(({ playNext, size = 24 }: any) => (
  <Pressable
    style={[styles.controlTouch, cursorPointer]}
    onPress={() => playNext()}
  >
    <SkipForwardIcon size={size} color={Colors.white} />
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
