import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react/native';
import { Ionicons } from '@expo/vector-icons';
import {
  ReplayIcon,
  Spinner,
} from 'app/modules/player/player-screen/video-player/VideoIcons';
import Colors from 'app/constants/Colors';

const PlayBtn = inject(stores => ({
  togglePlay: stores.playerStore.togglePlay.bind(stores.playerStore),
  replay: stores.playerStore.replay.bind(stores.playerStore),
  playbackState: stores.playerStore.playbackState,
}))(({ togglePlay, replay, playbackState }) => {
  if (playbackState === 'PAUSED') {
    return (
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={() => togglePlay()}
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
  if (playbackState === 'PLAYING') {
    return (
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={() => togglePlay()}
      >
        <View style={styles.containerWrap}>
          <View style={styles.playBtnCircle}>
            <Ionicons name={'ios-pause'} size={30} color={Colors.white} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  if (playbackState === 'ENDED') {
    return (
      <TouchableOpacity style={styles.controlTouch} onPress={() => replay()}>
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

export default PlayBtn;

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
    width: 87,
    height: 87,
    paddingRight: 10,
    paddingLeft: 13,
    paddingTop: 12,
    paddingBottom: 10,
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
