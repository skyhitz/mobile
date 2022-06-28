import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { inject } from 'mobx-react';
import * as stores from 'app/src/stores';
import SkipBackwardIcon from 'app/src/ui/icons/skip-backward';
import cursorPointer from 'app/src/constants/CursorPointer';

type Stores = typeof stores;

const PrevBtn = inject((stores: Stores) => ({
  playPrev: stores.playerStore.playPrev.bind(stores.playerStore),
}))(({ playPrev, size = 24 }: any) => (
  <Pressable
    style={[styles.controlTouch, cursorPointer]}
    onPress={() => playPrev()}
  >
    <SkipBackwardIcon size={size} color="white" />
  </Pressable>
));

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
