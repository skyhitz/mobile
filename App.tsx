import React from 'react';
import RootNavigation from 'app/modules/navigation/RootNavigation';
import Providers from 'app/modules/providers/Providers';
import bugsnag from '@bugsnag/expo';
import { View, Text } from 'react-native';
const bugsnagClient = bugsnag();
const ErrorBoundary = bugsnagClient.getPlugin('react');

const App = () => (
  <Providers>
    <RootNavigation />
  </Providers>
);

const ErrorView = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Text>Couldn't load app, contact us via Instagram, @skyhitz</Text>
  </View>
);

export default () => (
  <ErrorBoundary FallbackComponent={ErrorView}>
    <App />
  </ErrorBoundary>
);
