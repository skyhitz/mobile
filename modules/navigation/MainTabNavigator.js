import React from 'react';
import { Platform } from 'react-native';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';
import ProfileSettingsScreen from 'app/modules/profile/ProfileSettingsScreen';
import SearchNavigator from 'app/modules/search/SearchNavigator';
import TabBarWrapper from 'app/modules/tab-bar/TabBarWrapper';
import Colors from 'app/constants/Colors';

export default createBottomTabNavigator(
  {
    SearchNavigator: {
      screen: SearchNavigator,
      navigationOptions: {
        header: null,
      },
      path: `search`,
    },
    ProfileSettings: {
      screen: ProfileSettingsScreen,
      navigationOptions: {
        header: null,
      },
      path: `profile-settings`,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => renderTabBarIcon(focused, navigation),
    }),
    tabBarComponent: TabBarWrapper,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
    },
  }
);

function renderTabBarIcon(focused, navigation) {
  const { routeName } = navigation.state;
  let iconName;
  switch (routeName) {
    case 'SearchNavigator':
      iconName = Platform.OS === 'ios' ? `ios-search` : 'md-search';
      break;
    case 'ProfileSettings':
      return (
        <EvilIcons
          name={'user'}
          size={28}
          style={{ marginBottom: -3 }}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      );
  }
  return (
    <Ionicons
      name={iconName}
      size={28}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
