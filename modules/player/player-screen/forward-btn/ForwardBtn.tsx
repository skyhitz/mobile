import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { inject } from 'mobx-react';
import { ForwardBtnWhite } from 'app/assets/images/Images';
import * as stores from 'app/skyhitz-common';
import { TouchableOpacity } from 'react-native-gesture-handler';
type Stores = typeof stores;

const ForwardBtn = inject((stores: Stores) => ({
  playNext: stores.playerStore.playNext.bind(stores.playerStore),
}))(({ playNext }: any) => (
  <TouchableOpacity style={styles.controlTouch} onPress={() => playNext()}>
    <Image style={styles.forwardBtn} source={ForwardBtnWhite} />
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
