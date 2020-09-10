import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { inject } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

type Stores = typeof stores;

const PrevBtn = inject((stores: Stores) => ({
  playPrev: stores.playerStore.playPrev.bind(stores.playerStore),
}))(({ playPrev }: any) => (
  <TouchableOpacity style={styles.controlTouch} onPress={() => playPrev()}>
    <Feather name="rewind" size={24} color="white" />
  </TouchableOpacity>
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
