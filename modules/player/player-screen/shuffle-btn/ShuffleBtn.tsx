import React from 'react';
import { StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
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
        <Feather name="shuffle" size={20} color={Colors.lightBrandBlue} />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={styles.controlTouch}
      onPress={() => toggleShuffle()}
    >
      <Feather name="shuffle" size={20} color="white" />
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
