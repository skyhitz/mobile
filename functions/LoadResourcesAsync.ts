import * as Font from 'expo-font';
import {
  Ionicons,
  FontAwesome,
  EvilIcons,
  MaterialIcons,
} from '@expo/vector-icons';

enum FontDisplay {
  AUTO = 'auto',
  BLOCK = 'block',
  SWAP = 'swap',
  FALLBACK = 'fallback',
  OPTIONAL = 'optional',
}

export async function loadResourcesAsync() {
  return Promise.all([
    Font.loadAsync({
      'Raleway-Light': {
        uri: require('app/assets/fonts/Raleway-Light.ttf'),
        display: FontDisplay.SWAP,
        name: 'Raleway-Light',
      },
    }),
    Font.loadAsync(Ionicons.font),
    Font.loadAsync(FontAwesome.font),
    Font.loadAsync(MaterialIcons.font),
    Font.loadAsync(EvilIcons.font),
  ]);
}
