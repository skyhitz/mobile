import React from 'react';
import { View, Text } from 'react-native';
import { videoWidth } from 'app/src/player/player-screen/video-player/VideoConstants';
import { PLAYBACK_STATES } from 'app/src/player/player-screen/video-player/UiStates';
import { PlayerStore } from 'app/src/stores/player';

const VideoErrorText = () => {
  const { playbackState, error } = PlayerStore();
  if (playbackState == PLAYBACK_STATES.ERROR) {
    <View
      style={{
        position: 'absolute',
        width: videoWidth,
        marginRight: 20,
        marginLeft: 20,
      }}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        {error}
      </Text>
    </View>;
  }
  return null;
};

export default VideoErrorText;
