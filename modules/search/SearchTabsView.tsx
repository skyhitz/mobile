import React from 'react';
import { Text } from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
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

const Tab = createMaterialTopTabNavigator();

const TabsView = () => {
  return (
    <Tab.Navigator
      swipeEnabled={true}
      tabBarPosition={'top'}
      tabBarOptions={{
        activeTintColor: Colors.white,
        showIcon: false,
        style: {
          height: 38,
          backgroundColor: Colors.tabsBackground,
        },
      }}
      tabBar={props => (
        <MaterialTopTabBar {...props} indicatorStyle={indicatorStyle} />
      )}
    >
      <Tab.Screen
        name="Beats"
        component={SearchEntryView as any}
        options={{
          tabBarLabel: (props: any) => (
            <Text style={labelStyle(props) as any}> {'Beats'} </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Beatmakers"
        component={SearchUserView as any}
        options={{
          tabBarLabel: (props: any) => (
            <Text style={labelStyle(props) as any}> {'Beatmakers'} </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsView;
