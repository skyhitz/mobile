import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react';
import { PrevBtnWhite } from 'app/assets/images/Images';
import * as stores from 'skyhitz-common';
type Stores = typeof stores;

const PrevBtn = inject((stores:Stores) => ({
  playPrev: stores.playerStore.playPrev.bind(stores.playerStore),
}))(({ playPrev }: any) => (
  <TouchableOpacity style={styles.controlTouch} onPress={() => playPrev()}>
    <Image style={styles.prevBtn} source={PrevBtnWhite} />
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
