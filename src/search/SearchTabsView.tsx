import React from 'react';
import { Text, View } from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import SearchEntryView from 'app/src/search/SearchEntryView';
import SearchUserView from 'app/src/search/SearchUserView';
import Colors from 'app/src/constants/Colors';
import SearchHeader from './SearchHeader';
import ResponsiveLayout from '../ui/ResponsiveLayout';

const labelStyle = ({ focused }) => ({
  fontSize: 14,
  color: focused ? Colors.white : Colors.grey,
  textAlign: 'center',
  alignSelf: 'center',
  paddingTop: 0,
  paddingBottom: 14,
});

const indicatorStyle = {
  borderBottomColor: Colors.lightBrandBlue,
  borderBottomWidth: 1,
  backgroundColor: 'transparent',
};

const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      swipeEnabled={true}
      screenOptions={{
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.darkGrey,
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderColor: Colors.white,
        },
        tabBarShowIcon: false,
        tabBarStyle: {
          height: 38,
          backgroundColor: Colors.tabsBackground,
        },
        lazy: true,
      }}
      tabBar={(props) => (
        <View
          style={{ paddingTop: 10, backgroundColor: Colors.tabsBackground }}
        >
          <ResponsiveLayout>
            <SearchHeader />
            <MaterialTopTabBar {...props} indicatorStyle={indicatorStyle} />
          </ResponsiveLayout>
        </View>
      )}
    >
      <Tab.Screen
        name="Beats"
        component={SearchEntryView}
        options={{
          tabBarLabel: (props) => (
            <Text style={labelStyle(props) as any}> {'Beats'} </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Beatmakers"
        component={SearchUserView}
        options={{
          tabBarLabel: (props) => (
            <Text style={labelStyle(props) as any}> {'Beatmakers'} </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
