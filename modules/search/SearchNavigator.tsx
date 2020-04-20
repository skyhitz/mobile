import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import SearchTabsView from 'app/modules/search/SearchTabsView';
import SearchHeader from 'app/modules/search/SearchHeader';
import Colors from 'app/constants/Colors';
import ProfileScreen from 'app/modules/profile/ProfileScreen';

class SearchScreen extends React.Component<any, any> {
  static router = SearchTabsView.router;

  render() {
    return (
      <View style={styles.container}>
        <SearchHeader />
        <SearchTabsView navigation={this.props.navigation} />
      </View>
    );
  }
}

export default createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      headerShown: false,
    },
    path: '',
  },
  UserProfile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params ? navigation.state.params.username : '',
      headerTintColor: Colors.tabIconSelected,
      headerStyle: {
        backgroundColor: Colors.headerBackground,
        borderBottomWidth: 0,
      },
    }),
    path: 'profile',
  },
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },
});
