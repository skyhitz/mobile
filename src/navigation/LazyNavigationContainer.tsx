import React from 'react';
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

export default function LazyNavigationContainer(props) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      fallback={<LoadingScreen />}
      theme={Theme}
    >
      {props.children}
    </NavigationContainer>
  );
}
