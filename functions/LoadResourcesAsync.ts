import * as Font from 'expo-font';
import {
  Ionicons,
  FontAwesome,
  EvilIcons,
  MaterialIcons,
} from '@expo/vector-icons';

export async function loadResourcesAsync() {
  return Promise.all([
    Font.loadAsync({
      'Raleway-Light': require('app/assets/fonts/Raleway-Light.ttf'),
    }),
    Font.loadAsync(Ionicons.font),
    Font.loadAsync(FontAwesome.font),
    Font.loadAsync(MaterialIcons.font),
    Font.loadAsync(EvilIcons.font),
  ]);
}
