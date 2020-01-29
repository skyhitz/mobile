import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { inject } from 'mobx-react';
import { ShuffleIconBlue, ShuffleIconGrey } from 'app/assets/images/Images';
import * as stores from 'app/skyhitz-common';
import { TouchableOpacity } from 'react-native-gesture-handler';
type Stores = typeof stores;

const ShuffleBtn = inject((stores: Stores) => ({
  toggleShuffle: stores.playerStore.toggleShuffle.bind(stores.playerStore),
  shuffle: stores.playerStore.shuffle,
}))(({ toggleShuffle, shuffle }: any) => {
  if (shuffle) {
    return (
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={() => toggleShuffle()}
      >
        <Image style={styles.shuffleBtn} source={ShuffleIconBlue} />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={styles.controlTouch}
      onPress={() => toggleShuffle()}
    >
      <Image style={styles.shuffleBtn} source={ShuffleIconGrey} />
    </TouchableOpacity>
  );
});

export default ShuffleBtn;

var styles = StyleSheet.create({
  controlTouch: {
    alignSelf: 'center',
  },
  shuffleBtn: {
    width: 21,
    height: 18,
  },
});
