/**
 * @providesModule video-time-display
 * @flow
 */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import { PLAYBACK_STATES } from 'app/modules/player/player-screen/video-player/UiStates';
import { Stores } from 'skyhitz-common';

export const CurrentTimeDisplay = inject((stores: Stores) => ({
  positionDisplay: stores.playerStore.positionDisplay,
  playbackState: stores.playerStore.playbackState,
}))(({ positionDisplay, playbackState }: any) => {
  if (playbackState !== PLAYBACK_STATES.LOADING) {
    return <Text style={styles.currentTimeText}>{positionDisplay}</Text>;
  }
  return <Text style={styles.currentTimeText}>{'00:00'}</Text>;
});

export const DurationDisplay = inject((stores: Stores) => ({
  durationDisplay: stores.playerStore.durationDisplay,
  playbackState: stores.playerStore.playbackState,
}))(({ durationDisplay, playbackState }: any) => {
  if (playbackState !== PLAYBACK_STATES.LOADING) {
    return <Text style={styles.text}>{durationDisplay}</Text>;
  }
  return <Text style={styles.text}>{'00:00'}</Text>;
});

let styles = StyleSheet.create({
  currentTimeText: {
    color: '#FFFFFF',
    fontSize: 12,
    backgroundColor: 'transparent',
    marginLeft: 15,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    backgroundColor: 'transparent',
    marginLeft: 0,
  },
});
