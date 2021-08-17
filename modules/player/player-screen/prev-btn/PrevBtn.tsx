import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { inject } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
import { Feather } from '@expo/vector-icons';
import cursorPointer from 'app/constants/CursorPointer';

type Stores = typeof stores;

const PrevBtn = inject((stores: Stores) => ({
  playPrev: stores.playerStore.playPrev.bind(stores.playerStore),
}))(({ playPrev, size = 24 }: any) => (
  <Pressable
    style={[styles.controlTouch, cursorPointer]}
    onPress={() => playPrev()}
  >
    <Feather name="skip-back" size={size} color="white" />
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
