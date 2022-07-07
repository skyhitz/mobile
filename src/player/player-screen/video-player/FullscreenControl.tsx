import React from 'react';
import Control from 'app/src/player/player-screen/video-player/Control';
import {
  FullscreenEnterIcon,
  FullscreenExitIcon,
} from 'app/src/player/player-screen/video-player/VideoIcons';
import cursorPointer from 'app/src/constants/CursorPointer';
import { PlayerStore } from 'app/src/stores/player';

const FullscreenControl = () => {
  const {
    fullscreen,
    presentFullscreenPlayer,
    dismissFullscreenPlayer,
  } = PlayerStore();
  return (
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
        fullscreen ? dismissFullscreenPlayer() : presentFullscreenPlayer();
      }}
    >
      {fullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
    </Control>
  );
};

export default FullscreenControl;
