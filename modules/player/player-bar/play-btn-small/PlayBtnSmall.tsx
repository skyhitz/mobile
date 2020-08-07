import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Stores } from 'app/functions/Stores';

export default observer(() => {
  let { playerStore } = Stores();

  if (playerStore.isPlaying) {
    return (
      <TouchableOpacity
        style={styles.playBtnWrapper}
        onPress={() => playerStore.pauseAsync()}
      >
        <Feather name="pause" size={18} color="white" />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={styles.playBtnWrapper}
      onPress={() => playerStore.playAsync()}
    >
      <Feather name="play" size={18} color="white" />
    </TouchableOpacity>
  );
});

let styles = StyleSheet.create({
  playBtnWrapper: {
    width: 39,
    height: 39,
    justifyContent: 'center',
  },
  playBtn: {
    width: 15,
    height: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});
