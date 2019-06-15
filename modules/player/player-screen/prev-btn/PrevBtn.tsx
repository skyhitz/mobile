import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react/native';
import { PrevBtnWhite } from 'app/assets/images/Images';

const PrevBtn = inject(stores => ({
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
