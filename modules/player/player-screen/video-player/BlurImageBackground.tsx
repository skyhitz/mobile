import { ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

function BlurImageBackground(props) {
  return (
    <ImageBackground
      source={{
        uri: props.image,
      }}
      style={{
        opacity: props.opacity,
      }}
    >
      <BlurView intensity={props.intensity}>{props.children}</BlurView>
    </ImageBackground>
  );
}

export default BlurImageBackground;
