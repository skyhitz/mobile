import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react/native';
import { LoopIconBlue, LoopIconGrey } from 'app/assets/images/Images';

const LoopBtn = inject(stores => ({
  toggleLoop: stores.playerStore.toggleLoop.bind(stores.playerStore),
  loop: stores.playerStore.loop,
}))(({ toggleLoop, loop }: any) => {
  if (loop) {
    return (
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={() => toggleLoop()}
      >
        <Image style={styles.loopBtn} source={LoopIconBlue} />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.controlTouch} onPress={() => toggleLoop()}>
      <Image style={styles.loopBtn} source={LoopIconGrey} />
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
