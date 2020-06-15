import React from 'react';
import { Animated } from 'react-native';
import {
  videoHeight,
  videoWidth,
  centeredContentWidth,
} from 'app/modules/player/player-screen/video-player/VideoConstants';

const CenteredView = ({ children, ...otherProps }: any) => (
  <Animated.View
    {...otherProps}
    style={[
      {
        position: 'absolute',
        // left: (videoWidth - centeredContentWidth) / 2,
        // top: (videoHeight - centeredContentWidth) / 2,
        width: centeredContentWidth,
        height: centeredContentWidth,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    ]}
  >
    {children}
  </Animated.View>
);

export default CenteredView;
