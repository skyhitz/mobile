import React from 'react';
import { ImageBackground } from 'react-native';

const BackgroundImage = (props: any) => (
  <ImageBackground
    source={{
      uri:
        'https://res.cloudinary.com/skyhitz/image/upload/c_scale,q_auto:good,w_1313/v1582299226/web/live-push.jpg',
    }}
    style={{
      width: '100%',
      height: '100%',
    }}
  >
    <ImageBackground
      source={{
        uri:
          'https://res.cloudinary.com/skyhitz/image/upload/v1512424999/web/slider-overlay_jojxwg.png',
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
      imageStyle={{ opacity: 0.9 }}
      resizeMode="repeat"
    >
      {props.children}
    </ImageBackground>
  </ImageBackground>
);

export default BackgroundImage;
