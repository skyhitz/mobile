import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { PLAYBACK_STATES } from 'app/modules/player/player-screen/video-player/UiStates';
import { Stores } from 'app/functions/Stores';

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
    fontSize: 12,
    backgroundColor: 'transparent',
    marginLeft: 15,
    marginRight: 20,
    width: 36,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    backgroundColor: 'transparent',
    marginLeft: 20,
    marginRight: 0,
    width: 36,
  },
});
