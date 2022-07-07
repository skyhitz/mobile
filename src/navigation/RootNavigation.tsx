import React, { useState, useEffect, lazy } from 'react';
import { StatusBar } from 'react-native';
import { useMediaQuery } from 'react-responsive';
import LoadingScreen from 'app/src/accounts/LoadingScreen';
import { SuspenseLoading } from './SuspenseLoading';
import { userAtom } from '../atoms/atoms';
import { useRecoilValue } from 'recoil';

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

export default () => {
  const [loaded, setLoaded] = useState(false);
  const user = useRecoilValue(userAtom);

  StatusBar.setBarStyle('light-content');

  const loadAll = async () => {
    setLoaded(true);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const [headerShown, setHeaderShown] = useState(true);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  useEffect(() => {
    if (isDesktop) {
      setHeaderShown(false);
    }
  }, []);

  if (loaded) {
    return (
      <LazyNavigationContainerSuspense>
        <LazyAppStackNavigatorSuspense user={user} headerShown={headerShown} />
      </LazyNavigationContainerSuspense>
    );
  }
  return <LoadingScreen />;
};
