import React from 'react';
import { Animated } from 'react-native';
import { centeredContentWidth } from 'app/src/player/player-screen/video-player/VideoConstants';

const CenteredView = ({ children, ...otherProps }: any) => (
  <Animated.View
    {...otherProps}
    style={[
      {
        position: 'absolute',
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
