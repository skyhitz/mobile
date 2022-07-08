import React, { lazy } from 'react';
import { StatusBar } from 'react-native';
import { SuspenseLoading } from './SuspenseLoading';

const LazyAppStackNavigator = lazy(() =>
  import('app/src/navigation/LazyAppStackNavigator').then((mod) => ({
    default: mod.LazyAppStackNavigator,
  }))
);

export const LazyAppStackNavigatorSuspense = (props) => (
  <SuspenseLoading>
    <LazyAppStackNavigator {...props} />
  </SuspenseLoading>
);

const LazyNavigationContainer = lazy(() =>
  import('app/src/navigation/LazyNavigationContainer')
);

const LazyNavigationContainerSuspense = (props) => (
  <SuspenseLoading>
    <LazyNavigationContainer {...props} />
  </SuspenseLoading>
);

const RootNavigation = () => {
  StatusBar.setBarStyle('light-content');

  return (
    <LazyNavigationContainerSuspense>
      <LazyAppStackNavigatorSuspense />
    </LazyNavigationContainerSuspense>
  );
};

export default RootNavigation;
