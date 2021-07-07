import React from 'react';
import { Text, View } from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import SearchEntryView from 'app/modules/search/SearchEntryView';
import SearchUserView from 'app/modules/search/SearchUserView';
import Colors from 'app/constants/Colors';
import SearchHeader from './SearchHeader';

const labelStyle = (_) => ({
  fontSize: 14,
  color: Colors.defaultTextLight,
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
          style={{ paddingTop: 20, backgroundColor: Colors.tabsBackground }}
        >
          <SearchHeader />
          <MaterialTopTabBar {...props} indicatorStyle={indicatorStyle} />
        </View>
      )}
    >
      <Tab.Screen
        name="Beats"
        component={SearchEntryView}
        options={{
          tabBarLabel: (props: any) => (
            <Text style={labelStyle(props) as any}> {'Beats'} </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Beatmakers"
        component={SearchUserView}
        options={{
          tabBarLabel: (props: any) => (
            <Text style={labelStyle(props) as any}> {'Beatmakers'} </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
