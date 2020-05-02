import React from 'react';
import { Platform, View, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import ProfileSettingsScreen from 'app/modules/profile/ProfileSettingsScreen';
import SearchNavigator from 'app/modules/search/SearchNavigator';
import TabBarWrapper from 'app/modules/tab-bar/TabBarWrapper';
import Colors from 'app/constants/Colors';
import ChartsView from 'app/modules/search/ChartsView';
import { Logo } from 'app/assets/images/Images';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBarWrapper {...props} />}
      tabBarOptions={{
        showLabel: false,
        activeBackgroundColor: 'transparent',
        inactiveBackgroundColor: 'transparent',
        activeTintColor: Colors.tabIconSelected,
        inactiveTintColor: Colors.tabIconDefault,
      }}
    >
      <Tab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === 'ios' ? `ios-search` : 'md-search'}
              size={24}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChartsView"
        component={ChartsView}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                borderColor: color,
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
          ),
        }}
      />
      <Tab.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name={'user'} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

// export default createBottomTabNavigator(
//   {
//     SearchNavigator: {
//       screen: SearchNavigator,
//       path: `search`,
//     },
//     ChartsView: {
//       screen: ChartsView,
//       path: `charts`,
//     },
//     ProfileSettings: {
//       screen: ProfileSettingsScreen,
//       path: `profile`,
//     },
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused }: any) => renderTabBarIcon(focused, navigation),
//     }),
//     tabBarComponent: TabBarWrapper,
//     tabBarOptions: {
//       showLabel: false,
//       activeBackgroundColor: 'transparent',
//       inactiveBackgroundColor: 'transparent',
//     },
//     navigationOptions: {
//       cardStyle: { backgroundColor: 'transparent' },
//     },
//   }
// );

// function renderTabBarIcon(focused: any, navigation: any) {
//   const { routeName } = navigation.state;
//   let iconName;
//   switch (routeName) {
//     case 'SearchNavigator':
//       iconName = Platform.OS === 'ios' ? `ios-search` : 'md-search';
//       break;
//     case 'ProfileSettings':
//       return (
// <Feather
//   name={'user'}
//   size={24}
//   color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
// />
//       );
//     case 'ChartsView':
//       return (
// <View
//   style={{
//     borderColor: focused ? Colors.brandBlue : Colors.tabIconDefault,
//     borderWidth: 1.5,
//     borderRadius: 34,
//     width: 34,
//     height: 34,
//     justifyContent: 'center',
//   }}
// >
//   <Image
//     style={{
//       width: 14.7,
//       height: 11.22,
//       alignSelf: 'center',
//     }}
//     source={Logo}
//   />
// </View>
//       );
//   }
//   return (
// <Ionicons
//   name={iconName}
//   size={24}
//   style={{ marginBottom: -3 }}
//   color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
// />
//   );
// }
