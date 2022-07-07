import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { PLAYBACK_STATES } from 'app/src/player/player-screen/video-player/UiStates';
import { PlayerStore } from 'app/src/stores/player';

export const CurrentTimeDisplay = () => {
  const { playbackState, positionDisplay } = PlayerStore();
  if (playbackState !== PLAYBACK_STATES.LOADING) {
    return <Text style={styles.currentTimeText}>{positionDisplay}</Text>;
  }
  return <Text style={styles.currentTimeText}>{'00:00'}</Text>;
};

export const DurationDisplay = () => {
  const { durationDisplay, playbackState } = PlayerStore();
  if (playbackState !== PLAYBACK_STATES.LOADING) {
    return <Text style={styles.text}>{durationDisplay}</Text>;
  }
  return <Text style={styles.text}>{'00:00'}</Text>;
};

let styles = StyleSheet.create({
  currentTimeText: {
    color: '#FFFFFF',
    fontSize: 10,
    backgroundColor: 'transparent',
    marginRight: 10,
    width: 30,
    textAlign: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 10,
    backgroundColor: 'transparent',
    marginLeft: 10,
    width: 30,
    textAlign: 'center',
  },
});
