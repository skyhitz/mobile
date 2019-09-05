import React from 'react';
import CenteredView from 'app/modules/player/player-screen/video-player/CenteredView';
import { inject } from 'mobx-react';
import { Spinner } from 'app/modules/player/player-screen/video-player/VideoIcons';
import { PLAYBACK_STATES } from 'app/modules/player/player-screen/video-player/UiStates';
import * as stores from 'skyhitz-common';
type Stores = typeof stores;

const BUFFERING_SHOW_DELAY = 200;

const SpinnerView = inject((stores:Stores) => ({
  playbackState: stores.playerStore.playbackState,
  lastPlaybackStateUpdate: stores.playerStore.lastPlaybackStateUpdate,
}))(({ playbackState, lastPlaybackStateUpdate }: any) => {
  if (
    (playbackState == PLAYBACK_STATES.BUFFERING &&
      Date.now() - lastPlaybackStateUpdate > BUFFERING_SHOW_DELAY) ||
    playbackState == PLAYBACK_STATES.LOADING
  ) {
    return (
      <CenteredView>
        <Spinner />
      </CenteredView>
    );
  }
  return null;
});

export default SpinnerView;
