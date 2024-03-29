import * as Font from 'expo-font';
import * as React from 'react';
import RalewayLight from 'app/assets/fonts/Raleway-Light.ttf';
import { Images } from 'app/assets/images/Images';
import { useAssets } from 'expo-asset';

enum FontDisplay {
  AUTO = 'auto',
  BLOCK = 'block',
  SWAP = 'swap',
  FALLBACK = 'fallback',
  OPTIONAL = 'optional',
}

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [assets] = useAssets(Images);
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          'Raleway-Light': {
            uri: RalewayLight,
            display: FontDisplay.SWAP,
            name: 'Raleway-Light',
          },
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete && assets;
}
