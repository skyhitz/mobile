import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import ProfileSettingsTopContainer from 'app/modules/profile/ProfileSettingsTopContainer';
import EditBtn from 'app/modules/ui/EditBtn';
import ShareAppBanner from 'app/modules/marketing/ShareAppBanner';
import LikesScreen from 'app/modules/playlists/LikesScreen';
import MyMusicScreen from 'app/modules/playlists/MyMusicScreen';
import LikesRow from 'app/modules/playlists/LikesRow';
import MyMusicRow from 'app/modules/playlists/MyMusicRow';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  user: stores.sessionStore.user,
}))
class ProfileSettingsScreen extends React.Component<any, any> {
  render() {
    if (!this.props.user) {
      return null;
    }
    return (
      <View style={styles.container}>
        <ProfileSettingsTopContainer />
        <View style={styles.settingsContainer}>
          <LikesRow navigation={this.props.navigation} />
          <MyMusicRow navigation={this.props.navigation} />
          <ShareAppBanner navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const ProfileSettingsStack = createStackNavigator();

const ProfileSettingsNavigator = () => {
  return (
    <ProfileSettingsStack.Navigator>
      <ProfileSettingsStack.Screen
        name="ProfileSettingsScreen"
        component={ProfileSettingsScreen}
        options={{
          title: 'Profile',
          headerTintColor: Colors.tabIconSelected,
          headerStyle: {
            backgroundColor: Colors.headerBackground,
            borderBottomWidth: 0,
          },
          headerRight: () => <EditBtn />,
        }}
      />
      <ProfileSettingsStack.Screen
        name="LikesScreen"
        component={LikesScreen}
        options={{
          title: 'Likes',
          headerTitleStyle: { color: Colors.white },
          headerStyle: {
            backgroundColor: Colors.headerBackground,
            borderBottomWidth: 0,
          },
          headerTintColor: Colors.tabIconSelected,
        }}
      />
      <ProfileSettingsStack.Screen
        name="MyMusicScreen"
        component={MyMusicScreen}
        options={{
          title: 'My Music',
          headerTitleStyle: { color: Colors.white },
          headerStyle: {
            backgroundColor: Colors.headerBackground,
            borderBottomWidth: 0,
          },
          headerTintColor: Colors.tabIconSelected,
        }}
      />
    </ProfileSettingsStack.Navigator>
  );
};

export default ProfileSettingsNavigator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.listItemBackground,
    flex: 1,
  },
  settingsContainer: {
    flex: 1,
  },
  icon: {
    right: 10,
  },
});
