import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { inject } from 'mobx-react';
import {
  PLAYBACK_STATES,
  SEEK_STATES,
} from 'app/src/player/player-screen/video-player/UiStates';
import {
  videoHeight,
  videoWidth,
} from 'app/src/player/player-screen/video-player/VideoConstants';
import * as stores from 'app/src/stores';
type Stores = typeof stores;

const PlayPauseInvisibleArea = inject((stores: Stores) => ({
  playbackState: stores.playerStore.playbackState,
  seekState: stores.playerStore.seekState,
  togglePlay: stores.playerStore.togglePlay.bind(stores.playerStore),
}))(({ playbackState, seekState, togglePlay }: any) => {
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
});

export default PlayPauseInvisibleArea;
