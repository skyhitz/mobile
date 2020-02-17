import React from 'react';
import { Platform, View, Image } from 'react-native';
import { Ionicons, EvilIcons, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProfileSettingsScreen from 'app/modules/profile/ProfileSettingsScreen';
import SearchNavigator from 'app/modules/search/SearchNavigator';
import TabBarWrapper from 'app/modules/tab-bar/TabBarWrapper';
import Colors from 'app/constants/Colors';
import ChartsView from 'app/modules/search/ChartsView';
import { Logo } from 'app/assets/images/Images';

export default createBottomTabNavigator(
  {
    SearchNavigator: {
      screen: SearchNavigator,
      path: `search`,
    },
    ChartsView: {
      screen: ChartsView,
      path: `charts`,
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
        <Feather
          name={'user'}
          size={24}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      );
    case 'ChartsView':
      return (
        <View
          style={{
            borderColor: focused ? Colors.brandBlue : Colors.tabIconDefault,
            borderWidth: 1.5,
            borderRadius: 34,
            width: 34,
            height: 34,
            justifyContent: 'center',
          }}
        >
          <Image
            style={{
              width: 14.7,
              height: 11.22,
              alignSelf: 'center',
            }}
            source={Logo}
          />
        </View>
      );
  }
  return (
    <Ionicons
      name={iconName}
      size={24}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
