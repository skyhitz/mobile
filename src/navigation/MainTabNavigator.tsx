import React, { lazy } from 'react';
import { View } from 'react-native';
import ProfileSettingsScreen from 'app/src/profile/ProfileSettingsScreen';
import SearchNavigator from 'app/src/search/SearchNavigator';
import Colors from 'app/src/constants/Colors';
import ChartsView from 'app/src/search/ChartsView';
import BottomTabBar from './BottomTabBar';

import createBottomTabNavigator from './WebTabNavigator';
import { useMediaQuery } from 'react-responsive';
import MiniPlayerDesktop from '../player/player-bar/MiniPlayerDesktop';
import SkyhitzLogo from '../marketing/web/SkyhitzLogo';
import { SuspenseLoading } from './SuspenseLoading';
import SearchIcon from 'app/src/ui/icons/search';
import UserIcon from 'app/src/ui/icons/user';

const PlayerDrawer = lazy(() =>
  import('app/src/player/player-bar/PlayerDrawer')
);

const PlayerDrawerSuspense = (props) => (
  <SuspenseLoading>
    <PlayerDrawer {...props} />
  </SuspenseLoading>
);

const Tab = createBottomTabNavigator();

export default () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <Tab.Navigator
      tabBar={(props) => {
        if (isDesktop) {
          return (
            <>
              <BottomTabBar
                {...props}
                style={{
                  backgroundColor: Colors.tabsBackground,
                  borderTopColor: Colors.lightBrandBlue,
                  borderTopWidth: 1,
                }}
              />
              <MiniPlayerDesktop />
            </>
          );
        }
        return (
          <PlayerDrawerSuspense>
            <BottomTabBar
              {...props}
              style={{
                backgroundColor: Colors.tabsBackground,
                borderTopColor: Colors.lightBrandBlue,
                borderTopWidth: 1,
              }}
            />
          </PlayerDrawerSuspense>
        );
      }}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
        tabBarActiveTintColor: Colors.tabIconSelected,
        tabBarInactiveTintColor: Colors.tabIconDefault,
        lazy: true,
      }}
    >
      <Tab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="ChartsView"
        component={ChartsView}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                borderColor: color,
                borderWidth: 1.5,
                borderRadius: 34,
                width: 34,
                height: 34,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SkyhitzLogo width={16} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
