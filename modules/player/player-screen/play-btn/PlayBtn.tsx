import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import { Feather } from '@expo/vector-icons';
import {
  ReplayIcon,
  Spinner,
} from 'app/modules/player/player-screen/video-player/VideoIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Stores } from 'app/functions/Stores';

export default observer(() => {
  let { playerStore } = Stores();

  if (playerStore.playbackState === 'PAUSED') {
    return (
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={() => playerStore.togglePlay()}
      >
        <View style={styles.containerWrap}>
          <View style={styles.playBtnCircle}>
            <Feather
              style={{ paddingLeft: 6 }}
              name="play"
              size={24}
              color="white"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  if (playerStore.playbackState === 'PLAYING') {
    return (
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={() => playerStore.togglePlay()}
      >
        <View style={styles.containerWrap}>
          <View style={styles.playBtnCircle}>
            <Feather
              style={{ paddingLeft: 1, textAlign: 'center' }}
              name="pause"
              size={24}
              color="white"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  if (playerStore.playbackState === 'ENDED') {
    return (
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={() => playerStore.replay()}
      >
        <View style={styles.containerWrap}>
          <View style={styles.playBtnCircle}>
            <ReplayIcon />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.containerWrap}>
      <View style={styles.loadingSpinner}>
        <Spinner />
      </View>
    </View>
  );
});

var styles = StyleSheet.create({
  controlTouch: {
    alignSelf: 'center',
  },
  containerWrap: {
    width: 104,
    height: 90.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtnCircle: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingSpinner: {
    width: 86,
    height: 86,
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
