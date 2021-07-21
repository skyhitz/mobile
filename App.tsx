import 'setimmediate';
import React, { lazy, Suspense } from 'react';
import { Audio } from 'expo-av';
import RootNavigation from 'app/modules/navigation/RootNavigation';
import '@expo/match-media';
import useCachedResources from './functions/CacheResourcesAsync';
const Providers = lazy(() => import('app/modules/providers/Providers'));

import LoadingScreen from 'app/modules/accounts/LoadingScreen';
const SuspenseLoading = (props) => (
  <Suspense fallback={<LoadingScreen />}>{props.children}</Suspense>
);

const ProvidersSuspense = (props) => (
  <SuspenseLoading>
    <Providers {...props} />
  </SuspenseLoading>
);

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  allowsRecordingIOS: false,
  staysActiveInBackground: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  shouldDuckAndroid: false,
  playThroughEarpieceAndroid: false,
});

export default () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <LoadingScreen />;
  }
  return (
    <ProvidersSuspense>
      <RootNavigation />
    </ProvidersSuspense>
  );
};
