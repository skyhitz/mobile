import React from 'react';
import RootNavigation from 'app/modules/navigation/RootNavigation';
import Providers from 'app/modules/providers/Providers';
import { View, Text } from 'react-native';
import '@expo/match-media';
import useCachedResources from './functions/CacheResourcesAsync';

export default () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <Providers>
      <RootNavigation />
    </Providers>
  );
};

const ErrorView = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Text>Couldn't load app, contact us via Instagram, @skyhitz</Text>
  </View>
);
