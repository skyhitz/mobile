import 'setimmediate';
import React from 'react';
import { RecoilRoot } from 'recoil';

import RootNavigation from 'app/src/navigation/RootNavigation';
import '@expo/match-media';
import useCachedResources from '../src/functions/CacheResourcesAsync';
import ErrorBoundary from 'react-native-error-boundary';

const errorHandler = (error: Error, stackTrace: string) => {
  console.log('error', error);
  /* Log the error to an error reporting service */
};

import LoadingScreen from 'app/src/accounts/LoadingScreen';

export default () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <LoadingScreen />;
  }
  return (
    <RecoilRoot>
      <ErrorBoundary onError={errorHandler}>
        <RootNavigation />
      </ErrorBoundary>
    </RecoilRoot>
  );
};
