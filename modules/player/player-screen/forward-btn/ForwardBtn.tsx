import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { inject } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
type Stores = typeof stores;

const ForwardBtn = inject((stores: Stores) => ({
  playNext: stores.playerStore.playNext.bind(stores.playerStore),
}))(({ playNext }: any) => (
  <TouchableOpacity style={styles.controlTouch} onPress={() => playNext()}>
    <Feather name="fast-forward" size={24} color="white" />
  </TouchableOpacity>
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
