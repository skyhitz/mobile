import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { inject } from 'mobx-react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainTabNavigator from 'app/modules/navigation/MainTabNavigator';
import AccountsNavigator from 'app/modules/navigation/AccountsNavigator';
import { navigate } from 'app/modules/navigation/Navigator';
import EditProfileScreen from 'app/modules/profile/EditProfileScreen';
import EditPlaylistModal from 'app/modules/playlists/EditPlaylistModal';
import RemovePlaylistModal from 'app/modules/playlists/RemovePlaylistModal';
import EntryOptionsModal from 'app/modules/search/EntryOptionsModal';
import PricingOptionsModal from 'app/modules/search/PricingOptionsModal';
import SelectPlaylistModal from 'app/modules/playlists/SelectPlaylistModal';
import UploadMusicModal from 'app/modules/profile/UploadMusicModal';
import WithdrawalModal from 'app/modules/profile/WithdrawalModal';
import BuyOptionsModal from 'app/modules/ui/BuyOptionsModal';
import AuthLoadingScreen from 'app/modules/accounts/AuthLoadingScreen';
import Colors from 'app/constants/Colors';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

const AuthStack = createStackNavigator({
  Accounts: {
    screen: AccountsNavigator,
    navigationOptions: {
      headerShown: false,
    },
    path: `accounts`,
  },
});

const AppStack = createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      path: `main`,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
    EditProfileModal: {
      screen: EditProfileScreen as any,
      path: `edit-profile`,
    },
    EditPlaylistModal: {
      screen: EditPlaylistModal,
      path: `edit-playlist-modal`,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    UploadMusicModal: {
      screen: UploadMusicModal,
      path: `upload-music-modal`,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    WithdrawalModal: {
      screen: WithdrawalModal,
      path: `withdrawal-modal`,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    BuyOptionsModal: {
      screen: BuyOptionsModal,
      path: `buy-options-modal`,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    RemovePlaylistModal: {
      screen: RemovePlaylistModal,
      path: 'remove-playlist',
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    EntryOptionsModal: {
      screen: EntryOptionsModal,
      path: `entry-options-modal`,
      navigationOptions: {
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    PricingOptionsModal: {
      screen: PricingOptionsModal,
      path: `pricing-options-modal`,
      navigationOptions: {
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
    SelectPlaylistModal: {
      screen: SelectPlaylistModal as any,
      path: `select-playlist-modal`,
      navigationOptions: {
        gestureEnabled: false,
        cardStyle: { backgroundColor: 'transparent' },
      },
    },
  },
  {
    mode: 'modal',
  }
);

const RootStackNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const AppContainer = createAppContainer(RootStackNavigator);

@inject((stores: Stores) => ({
  user: stores.sessionStore.user,
  loadUserLikes: stores.likesStore.refreshLikes.bind(stores.likesStore),
  loadPlaylists: stores.playlistsStore.refreshPlaylists.bind(
    stores.playlistsStore
  ),
  loadUserEntries: stores.userEntriesStore.refreshEntries.bind(
    stores.userEntriesStore
  ),
  loadPayments: stores.paymentsStore.refreshSubscription.bind(
    stores.paymentsStore
  ),
}))
export default class RootNavigator extends React.Component<any, any> {
  state = {};
  static async getDerivedStateFromProps(props: any) {
    StatusBar.setBarStyle('light-content');

    // Kicks user out in case there is an authentication error and the user is set to null.
    // This could happen if a non authorized request is made to a protected endpoint.
    // Automatically redirects to accounts if the user logs out.
    if (!props.user) {
      navigate('Auth');
    } else {
      [
        await props.loadUserLikes(),
        await props.loadPlaylists(),
        await props.loadUserEntries(),
        await props.loadPayments(),
      ];
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <AppContainer style={[styles.appContainer]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },
  statusBarUnderlay: {
    height: 0,
    backgroundColor: 'transparent',
  },
  appContainer: {
    backgroundColor: 'transparent',
  },
});
