import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { inject } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
import { Feather } from '@expo/vector-icons';
type Stores = typeof stores;

const ForwardBtn = inject((stores: Stores) => ({
  playNext: stores.playerStore.playNext.bind(stores.playerStore),
}))(({ playNext }: any) => (
  <Pressable style={styles.controlTouch} onPress={() => playNext()}>
    <Feather name="fast-forward" size={24} color="white" />
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
