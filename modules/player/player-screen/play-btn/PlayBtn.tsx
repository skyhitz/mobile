import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import { Ionicons } from '@expo/vector-icons';
import {
  ReplayIcon,
  Spinner,
} from 'app/modules/player/player-screen/video-player/VideoIcons';
import Colors from 'app/constants/Colors';
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
            <Ionicons
              name={'ios-play'}
              size={30}
              color={Colors.white}
              style={styles.playBtn}
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
            <Ionicons name={'ios-pause'} size={30} color={Colors.white} />
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
  playBtn: {
    paddingLeft: 6,
  },
  containerWrap: {
    width: 130,
    height: 113,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtnCircle: {
    width: 87,
    height: 87,
    padding: 10,
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
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
