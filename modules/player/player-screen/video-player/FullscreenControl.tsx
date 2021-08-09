import React from 'react';
import { inject } from 'mobx-react';
import Control from 'app/modules/player/player-screen/video-player/Control';
import {
  FullscreenEnterIcon,
  FullscreenExitIcon,
} from 'app/modules/player/player-screen/video-player/VideoIcons';
import * as stores from 'app/skyhitz-common';
import cursorPointer from 'app/constants/CursorPointer';
type Stores = typeof stores;

const FullscreenControl = inject((stores: Stores) => ({
  isOnFullScreenMode: stores.playerStore.isOnFullScreenMode,
  presentFullscreenPlayer: stores.playerStore.presentFullscreenPlayer.bind(
    stores.playerStore
  ),
  dismissFullscreenPlayer: stores.playerStore.dismissFullscreenPlayer.bind(
    stores.playerStore
  ),
}))(
  ({
    isOnFullScreenMode,
    presentFullscreenPlayer,
    dismissFullscreenPlayer,
  }: any) => (
    <Control
      style={[
        {
          backgroundColor: 'transparent',
          marginLeft: 10,
          marginRight: 0,
        },
        cursorPointer,
      ]}
      center={false}
      callback={() => {
        isOnFullScreenMode
          ? dismissFullscreenPlayer()
          : presentFullscreenPlayer();
      }}
    >
      {isOnFullScreenMode ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
    </Control>
  )
);

export default FullscreenControl;
