import React from 'react';
import { Text, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import SearchEntryView from 'app/modules/search/SearchEntryView';
import SearchUserView from 'app/modules/search/SearchUserView';
import Colors from 'app/constants/Colors';

const labelStyle = props => ({
  fontSize: 12,
  color: props.focused ? props.tintColor : Colors.defaultTextLight,
  textAlign: 'center',
  alignSelf: 'center',
  paddingTop: 2,
  paddingBottom: 4,
});

const indicatorStyle = {
  borderBottomColor: Colors.lightBrandBlue,
  borderBottomWidth: 1,
  alignSelf: 'flex-end',
  backgroundColor: 'transparent',
};

function renderTabBarLabel(props, title) {
  return <Text style={labelStyle(props)}> {title} </Text>;
}

function renderTabBarTop(props) {
  return <MaterialTopTabBar {...props} indicatorStyle={indicatorStyle} />;
}

const TabsView = createMaterialTopTabNavigator(
  {
    Music: {
      screen: SearchEntryView,
      navigationOptions: {
        tabBarLabel: props => renderTabBarLabel(props, 'Music'),
      },
      path: `music`,
    },
    Influencers: {
      screen: SearchUserView,
      navigationOptions: {
        tabBarLabel: props => renderTabBarLabel(props, 'Influencers'),
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
        height: 36,
        backgroundColor: Colors.tabsBackground,
      },
    },
  }
);

export default TabsView;
