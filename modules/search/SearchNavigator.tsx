import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchTabsView from 'app/modules/search/SearchTabsView';
import Colors from 'app/constants/Colors';
import ProfileScreen from 'app/modules/profile/ProfileScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchTabsView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={({ route }) => ({
          headerTitle: route.name,
          headerTintColor: Colors.tabIconSelected,
          headerStyle: {
            backgroundColor: Colors.headerBackground,
            borderBottomWidth: 0,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
