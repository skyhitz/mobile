import React from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
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
  paddingBottom: 14,
});

const indicatorStyle = {
  borderBottomColor: Colors.lightBrandBlue,
  borderBottomWidth: 1,
  backgroundColor: 'transparent',
};

const TabsView = createMaterialTopTabNavigator(
  {
    Music: {
      screen: SearchEntryView,
      navigationOptions: {
        tabBarLabel: (props: any) => (
          <Text style={labelStyle(props) as any}> {'Music'} </Text>
        ),
      },
      path: `music`,
    },
    Influencers: {
      screen: SearchUserView,
      navigationOptions: {
        tabBarLabel: (props: any) => (
          <Text style={labelStyle(props) as any}> {'Beatmakers'} </Text>
        ),
      },
      path: `beatmakers`,
    },
  },
  {
    tabBarComponent: props => (
      <MaterialTopTabBar {...props} indicatorStyle={indicatorStyle} />
    ),
    tabBarPosition: 'top',
    swipeEnabled: true,
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
