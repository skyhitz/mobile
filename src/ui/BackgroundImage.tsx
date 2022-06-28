import React from 'react';
import { ImageBackground } from 'react-native';
import { SliderOverlay, LivePush } from 'assets/images/Images';

export default (props: any) => (
  <ImageBackground
    source={LivePush}
    style={{
      width: '100%',
      height: '100%',
    }}
    resizeMode="cover"
  >
    <ImageBackground
      source={SliderOverlay}
      style={[
        {
          width: '100%',
          height: '100%',
        },
        props.authBackground
          ? {
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }
          : {},
      ]}
      imageStyle={{ opacity: 0.9 }}
      resizeMode="repeat"
    >
      {props.children}
    </ImageBackground>
  </ImageBackground>
);
