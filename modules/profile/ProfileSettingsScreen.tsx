import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import ProfileSettingsTopContainer from 'app/modules/profile/ProfileSettingsTopContainer';
import EditBtn from 'app/modules/ui/EditBtn';
import ShareAppBanner from 'app/modules/marketing/ShareAppBanner';
import LikesScreen from 'app/modules/playlists/LikesScreen';
import PlaylistsScreen from 'app/modules/playlists/PlaylistsScreen';
import MyMusicScreen from 'app/modules/playlists/MyMusicScreen';
import LikesRow from 'app/modules/playlists/LikesRow';
import PlaylistsRow from 'app/modules/playlists/PlaylistsRow';
import PlaylistScreen from 'app/modules/playlists/PlaylistScreen';
import MyMusicRow from 'app/modules/playlists/MyMusicRow';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  user: stores.sessionStore.user,
}))
class ProfileSettingsScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: 'Profile',
    headerTintColor: Colors.tabIconSelected,
    headerStyle: {
      backgroundColor: Colors.headerBackground,
      borderBottomWidth: 0,
    },
    headerRight: () => <EditBtn />,
  };
  render() {
    if (!this.props.user) {
      return null;
    }
    return (
      <View style={styles.container}>
        <ProfileSettingsTopContainer />
        <View style={styles.settingsContainer}>
          <LikesRow />
          <PlaylistsRow />
          <MyMusicRow />
          <ShareAppBanner />
        </View>
      </View>
    );
  }
}

export default createStackNavigator({
  ProfileSettingsScreen: {
    screen: ProfileSettingsScreen as any,
    path: '',
  },
  LikesScreen: {
    screen: LikesScreen as any,
    path: 'likes',
  },
  PlaylistsScreen: {
    screen: PlaylistsScreen as any,
    path: 'playlists',
  },
  PlaylistScreen: {
    screen: PlaylistScreen,
    path: 'playlist',
  },
  MyMusicScreen: {
    screen: MyMusicScreen,
    path: 'my-music',
  },
});

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
