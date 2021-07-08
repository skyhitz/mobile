import React from 'react';
import { View, Image } from 'react-native';
import { EvilIcons, Feather } from '@expo/vector-icons';
import ProfileSettingsScreen from 'app/modules/profile/ProfileSettingsScreen';
import SearchNavigator from 'app/modules/search/SearchNavigator';
import PlayerDrawer from 'app/modules/player/player-bar/PlayerDrawer';
import Colors from 'app/constants/Colors';
import ChartsView from 'app/modules/search/ChartsView';
import { Logo } from 'app/assets/images/Images';
import {
  // createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';

import createBottomTabNavigator from './WebTabNavigator';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      tabBar={(props) => {
        return (
          <PlayerDrawer>
            <BottomTabBar
              {...props}
              style={{
                backgroundColor: Colors.tabsBackground,
                borderTopColor: Colors.lightBrandBlue,
                borderTopWidth: 1,
              }}
            />
          </PlayerDrawer>
        );
      }}
      // screenOptions={{
      //   tabBarShowLabel: false,
      //   tabBarActiveBackgroundColor: 'transparent',
      //   tabBarInactiveBackgroundColor: 'transparent',
      //   tabBarActiveTintColor: Colors.tabIconSelected,
      //   tabBarInactiveTintColor: Colors.tabIconDefault,
      //   lazy: true,
      // }}
    >
      <Tab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        // options={{
        //   headerShown: false,
        //   tabBarIcon: ({ color }) => (
        //     <EvilIcons
        //       name={'search'}
        //       size={24}
        //       style={{ marginBottom: -3 }}
        //       color={color}
        //     />
        //   ),
        // }}
      />
      <Tab.Screen
        name="ChartsView"
        component={ChartsView}
        // options={{
        //   // headerShown: false,
        //   tabBarIcon: ({ color }) => (
        //     <View
        //       style={{
        //         borderColor: color,
        //         borderWidth: 1.5,
        //         borderRadius: 34,
        //         width: 34,
        //         height: 34,
        //         justifyContent: 'center',
        //       }}
        //     >
        //       <Image
        //         style={{
        //           width: 14.7,
        //           height: 11.22,
        //           alignSelf: 'center',
        //         }}
        //         source={Logo}
        //       />
        //     </View>
        //   ),
        // }}
      />
      <Tab.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
        // options={{
        //   // headerShown: false,
        //   tabBarIcon: ({ color }) => (
        //     <Feather name={'user'} size={24} color={color} />
        //   ),
        // }}
      />
    </Tab.Navigator>
  );
};
