import React from 'react';
import { View, Text } from 'react-native';
import { inject } from 'mobx-react';
import {
  videoHeight,
  videoWidth,
} from 'app/modules/player/player-screen/video-player/VideoConstants';
import { PLAYBACK_STATES } from 'app/modules/player/player-screen/video-player/UiStates';
import * as stores from 'skyhitz-common';
type Stores = typeof stores;

const VideoErrorText = inject((stores:Stores) => ({
  playbackState: stores.playerStore.playbackState,
  error: stores.playerStore.error,
}))(({ playbackState, error }: any) => {
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
