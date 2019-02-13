import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react/native';
import { ForwardBtnWhite } from 'app/assets/images/Images';

const ForwardBtn = inject(stores => ({
  playNext: stores.playerStore.playNext.bind(stores.playerStore),
}))(({ playNext }) => (
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
