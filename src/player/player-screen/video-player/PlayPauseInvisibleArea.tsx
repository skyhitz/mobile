import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import {
  PLAYBACK_STATES,
  SEEK_STATES,
} from 'app/src/player/player-screen/video-player/UiStates';
import {
  videoHeight,
  videoWidth,
} from 'app/src/player/player-screen/video-player/VideoConstants';
import { PlayerStore } from 'app/src/stores/player';

const PlayPauseInvisibleArea = () => {
  const { playbackState, seekState, togglePlay } = PlayerStore();
  if (
    (seekState == SEEK_STATES.NOT_SEEKING || seekState == SEEK_STATES.SEEKED) &&
    (playbackState == PLAYBACK_STATES.PLAYING ||
      playbackState == PLAYBACK_STATES.PAUSED)
  ) {
    return (
      <TouchableWithoutFeedback onPress={() => togglePlay()}>
        <View
          style={{
            width: videoWidth,
            height: videoHeight,
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0,
          }}
        />
      </TouchableWithoutFeedback>
    );
  }
  return null;
};

export default PlayPauseInvisibleArea;
