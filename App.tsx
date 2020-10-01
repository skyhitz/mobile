import React from 'react';
import RootNavigation from 'app/modules/navigation/RootNavigation';
import Providers from 'app/modules/providers/Providers';
import '@expo/match-media';
import useCachedResources from './functions/CacheResourcesAsync';
import LoadingScreen from './modules/accounts/LoadingScreen';

export default () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <LoadingScreen />;
  }
  return (
    <Providers>
      <RootNavigation />
    </Providers>
  );
};
