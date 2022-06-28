import React, { useState, useEffect, lazy } from 'react';
import { StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { useMediaQuery } from 'react-responsive';
import { Stores } from 'app/src/functions/Stores';
import LoadingScreen from 'app/src/accounts/LoadingScreen';
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

export default observer(() => {
  const [loaded, setLoaded] = useState(false);
  const { sessionStore } = Stores();

  StatusBar.setBarStyle('light-content');

  const loadAll = async () => {
    await sessionStore.loadSession();
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
        <LazyAppStackNavigatorSuspense
          user={sessionStore.user}
          headerShown={headerShown}
        />
      </LazyNavigationContainerSuspense>
    );
  }
  return <LoadingScreen />;
});
