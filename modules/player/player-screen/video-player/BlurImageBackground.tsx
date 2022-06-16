import { ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

function BlurImageBackground(props) {
  return (
    <ImageBackground
      source={{
        uri: props.image,
      }}
      style={props.style}
      resizeMode="contain"
    >
      <BlurView intensity={props.intensity}>{props.children}</BlurView>
    </ImageBackground>
  );
}

export default BlurImageBackground;
