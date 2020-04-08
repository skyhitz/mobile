/// <reference path="./CreateBrowserApp.d.ts"/>
import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { inject } from 'mobx-react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBrowserApp } from '@react-navigation/web';
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
import * as stores from 'app/skyhitz-common';
import WebApp from '../marketing/web/Home';

type Stores = typeof stores;

const AuthStack = createStackNavigator({
  Accounts: {
    screen: AccountsNavigator,
    navigationOptions: {
      headerShown: false,
    },
    path: ``,
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

const createApp = Platform.select({
  web: (config: any) =>
    createBrowserApp(config, {
      history:
        typeof (global as any).window !== 'undefined' ? 'browser' : 'memory',
    }),
  default: (config: any) => createAppContainer(config),
});

const RootStackNavigator = createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen,
      path: ``,
    },
    App: {
      screen: AppStack,
      path: `app`,
    },
    Auth: {
      screen: AuthStack,
      path: `accounts`,
    },
    WebApp: {
      screen: WebApp,
      path: ``,
    },
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const AppContainer = createApp(RootStackNavigator);

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
    return <AppContainer />;
  }
}
