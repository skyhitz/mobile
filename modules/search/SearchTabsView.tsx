/// <reference path="../tab-bar/TabBarWrapper.d.ts" />

import React from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import SearchEntryView from 'app/modules/search/SearchEntryView';
import SearchUserView from 'app/modules/search/SearchUserView';
import Colors from 'app/constants/Colors';

const labelStyle = (props: { focused: any; tintColor: any }) => ({
  fontSize: 14,
  color: props.focused ? props.tintColor : Colors.defaultTextLight,
  textAlign: 'center',
  alignSelf: 'center',
  paddingTop: 0,
  paddingBottom: 4,
});

const indicatorStyle = {
  borderBottomColor: Colors.lightBrandBlue,
  borderBottomWidth: 1,
  alignSelf: 'flex-end',
  backgroundColor: 'transparent',
};

function renderTabBarLabel(props: any, title: React.ReactNode) {
  return <Text style={labelStyle(props) as any}> {title} </Text>;
}

function renderTabBarTop(props: JSX.IntrinsicAttributes) {
  return <MaterialTopTabBar {...props} indicatorStyle={indicatorStyle} />;
}

const TabsView = createMaterialTopTabNavigator(
  {
    Music: {
      screen: SearchEntryView,
      navigationOptions: {
        tabBarLabel: (props: any) => renderTabBarLabel(props, 'Music'),
      },
      path: `music`,
    },
    Influencers: {
      screen: SearchUserView,
      navigationOptions: {
        tabBarLabel: (props: any) => renderTabBarLabel(props, 'Influencers'),
      },
      path: `influencers`,
    },
  },
  {
    tabBarComponent: props => renderTabBarTop(props),
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: Colors.white,
      showIcon: false,
      style: {
        height: 38,
        backgroundColor: Colors.tabsBackground,
      },
    },
  }
);

export default TabsView;
