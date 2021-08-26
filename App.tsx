import 'setimmediate';
import React, { lazy, Suspense } from 'react';
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
