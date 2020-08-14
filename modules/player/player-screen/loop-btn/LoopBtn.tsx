import React from 'react';
import { StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
type Stores = typeof stores;

const LoopBtn = inject((stores: Stores) => ({
  toggleLoop: stores.playerStore.toggleLoop.bind(stores.playerStore),
  loop: stores.playerStore.loop,
}))(({ toggleLoop, loop }: any) => {
  if (loop) {
    return (
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={() => toggleLoop()}
      >
        <Feather name="repeat" size={20} color={Colors.lightBrandBlue} />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.controlTouch} onPress={() => toggleLoop()}>
      <Feather name="repeat" size={20} color={Colors.white} />
    </TouchableOpacity>
  );
});

export default LoopBtn;

var styles = StyleSheet.create({
  controlTouch: {
    alignSelf: 'center',
  },
  loopBtn: {
    width: 21,
    height: 16.5,
  },
});
