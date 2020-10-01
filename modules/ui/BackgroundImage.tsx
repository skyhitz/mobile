import React from 'react';
import { ImageBackground } from 'react-native';

export default (props: any) => (
  <ImageBackground
    source={{
      uri:
        'https://res.cloudinary.com/skyhitz/image/upload/c_scale,q_auto:good,w_1313/v1582299226/web/live-push.jpg',
    }}
    style={{
      width: '100%',
      height: '100%',
      flex: 1,
    }}
    resizeMode="cover"
  >
    <ImageBackground
      source={{
        uri:
          'https://res.cloudinary.com/skyhitz/image/upload/v1512424999/web/slider-overlay_jojxwg.png',
      }}
      style={[
        {
          width: '100%',
          height: '100%',
          flex: 1,
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
