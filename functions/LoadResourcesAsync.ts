import * as Font from 'expo-font';
import {
  Ionicons,
  FontAwesome,
  EvilIcons,
  MaterialIcons,
} from '@expo/vector-icons';

const f: any = Font;

enum FontDisplay {
  AUTO = 'auto',
  BLOCK = 'block',
  SWAP = 'swap',
  FALLBACK = 'fallback',
  OPTIONAL = 'optional',
}

export async function loadResourcesAsync() {
  return Promise.all([
    f.loadAsync({
      'Raleway-Light': {
        uri: require('app/assets/fonts/Raleway-Light.ttf'),
        fontDisplay: FontDisplay.SWAP,
        name: 'Raleway-Light',
      },
    }),
    f.loadAsync(Ionicons.font),
    f.loadAsync(FontAwesome.font),
    f.loadAsync(MaterialIcons.font),
    f.loadAsync(EvilIcons.font),
  ]);
}
