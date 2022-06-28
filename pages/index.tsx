import 'setimmediate';
import React, { lazy, Suspense } from 'react';
import RootNavigation from 'app/src/navigation/RootNavigation';
import '@expo/match-media';
import useCachedResources from '../src/functions/CacheResourcesAsync';
import ErrorBoundary from 'react-native-error-boundary';

const errorHandler = (error: Error, stackTrace: string) => {
  console.log('error', error);
  /* Log the error to an error reporting service */
};
const Providers = lazy(() => import('app/src/providers/Providers'));

import LoadingScreen from 'app/src/accounts/LoadingScreen';
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
    <ErrorBoundary onError={errorHandler}>
      <ProvidersSuspense>
        <RootNavigation />
      </ProvidersSuspense>
    </ErrorBoundary>
  );
};
