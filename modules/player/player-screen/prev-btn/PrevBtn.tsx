import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { inject } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
import { Feather } from '@expo/vector-icons';

type Stores = typeof stores;

const PrevBtn = inject((stores: Stores) => ({
  playPrev: stores.playerStore.playPrev.bind(stores.playerStore),
}))(({ playPrev }: any) => (
  <Pressable style={styles.controlTouch} onPress={() => playPrev()}>
    <Feather name="rewind" size={24} color="white" />
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
