import React from 'react';
import { StatusBar } from 'react-native';
import { AppStackNavigator } from 'app/src/navigation/AppStackNavigator';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Colors from 'app/src/constants/Colors';
import LinkingConfiguration from './LinkingConfiguration';
import LoadingScreen from 'app/src/accounts/LoadingScreen';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: Colors.darkBlue,
    background: Colors.darkBlue,
  },
};

const RootNavigation = () => {
  StatusBar.setBarStyle('light-content');

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      fallback={<LoadingScreen />}
      theme={Theme}
    >
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigation;
