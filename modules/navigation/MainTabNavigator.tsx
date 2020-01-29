import React from 'react';
import { Platform } from 'react-native';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProfileSettingsScreen from 'app/modules/profile/ProfileSettingsScreen';
import SearchNavigator from 'app/modules/search/SearchNavigator';
import TabBarWrapper from 'app/modules/tab-bar/TabBarWrapper';
import Colors from 'app/constants/Colors';

export default createBottomTabNavigator(
  {
    SearchNavigator: {
      screen: SearchNavigator,
      path: `search`,
    },
    ProfileSettings: {
      screen: ProfileSettingsScreen,
      path: `profile-settings`,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }: any) => renderTabBarIcon(focused, navigation),
    }),
    tabBarComponent: TabBarWrapper,
    tabBarOptions: {
      showLabel: false,
      activeBackgroundColor: 'transparent',
      inactiveBackgroundColor: 'transparent',
    },
    navigationOptions: {
      cardStyle: { backgroundColor: 'transparent' },
    },
  }
);

function renderTabBarIcon(focused: any, navigation: any) {
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
