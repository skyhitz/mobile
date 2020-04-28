import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchTabsView from 'app/modules/search/SearchTabsView';
import SearchHeader from 'app/modules/search/SearchHeader';
import Colors from 'app/constants/Colors';
import ProfileScreen from 'app/modules/profile/ProfileScreen';

// fix me:pass props
class SearchScreen extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.container}>
        <SearchHeader />
        <SearchTabsView />
      </View>
    );
  }
}

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },
});
