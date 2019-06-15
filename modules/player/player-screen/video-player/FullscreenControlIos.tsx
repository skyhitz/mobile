import React from 'react';
import { inject } from 'mobx-react/native';
import Control from 'app/modules/player/player-screen/video-player/Control';
import {
  FullscreenEnterIcon,
  FullscreenExitIcon,
} from 'app/modules/player/player-screen/video-player/VideoIcons';

const FullscreenControlIos = inject(stores => ({
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
      style={{ backgroundColor: 'transparent' }}
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

export default FullscreenControlIos;
