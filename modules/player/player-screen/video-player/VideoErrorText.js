import React from 'react';
import { View, Text } from 'react-native';
import { inject } from 'mobx-react/native';
import {
  videoHeight,
  videoWidth,
} from 'app/modules/player/player-screen/video-player/VideoConstants';
import { PLAYBACK_STATES } from 'app/modules/player/player-screen/video-player/UiStates';

const VideoErrorText = inject(stores => ({
  playbackState: stores.playerStore.playbackState,
  error: stores.playerStore.error,
}))(({ playbackState, error }) => {
  if (playbackState == PLAYBACK_STATES.ERROR) {
    <View
      style={{
        position: 'absolute',
        top: videoHeight / 2,
        width: videoWidth - 40,
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
});

export default VideoErrorText;
