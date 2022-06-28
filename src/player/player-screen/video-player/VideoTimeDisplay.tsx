import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { PLAYBACK_STATES } from 'app/src/player/player-screen/video-player/UiStates';
import { Stores } from 'app/src/functions/Stores';

export const CurrentTimeDisplay = observer(() => {
  const { playerStore } = Stores();
  if (playerStore.playbackState !== PLAYBACK_STATES.LOADING) {
    return (
      <Text style={styles.currentTimeText}>{playerStore.positionDisplay}</Text>
    );
  }
  return <Text style={styles.currentTimeText}>{'00:00'}</Text>;
});

export const DurationDisplay = observer(() => {
  const { playerStore } = Stores();
  if (playerStore.playbackState !== PLAYBACK_STATES.LOADING) {
    return <Text style={styles.text}>{playerStore.durationDisplay}</Text>;
  }
  return <Text style={styles.text}>{'00:00'}</Text>;
});

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
