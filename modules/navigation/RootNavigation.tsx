import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, Platform } from 'react-native';
import { observer } from 'mobx-react';
import MainTabNavigator from 'app/modules/navigation/MainTabNavigator';
import AccountsNavigator from 'app/modules/navigation/AccountsNavigator';
import { setNavigator } from 'app/modules/navigation/Navigator';
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
import { NavStatelessComponent } from 'app/interfaces/Interfaces';
import { Stores } from 'app/functions/Stores';
import { loadResourcesAsync } from 'app/functions/LoadResourcesAsync';
import { Asset } from 'expo-asset';
import { Images } from 'app/assets/images/Images';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useLinking } from '@react-navigation/native';

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Accounts"
        component={AccountsNavigator}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator mode="modal">
      <AppStack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <AppStack.Screen
        name="EditProfileModal"
        component={EditProfileScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <AppStack.Screen
        name="EditPlaylistModal"
        component={EditPlaylistModal}
        options={{
          headerShown: false,
          gestureEnabled: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
      <AppStack.Screen
        name="UploadMusicModal"
        component={UploadMusicModal}
        options={{
          headerShown: false,
          gestureEnabled: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
      <AppStack.Screen
        name="WithdrawalModal"
        component={WithdrawalModal}
        options={{
          headerShown: false,
          gestureEnabled: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
      <AppStack.Screen
        name="BuyOptionsModal"
        component={BuyOptionsModal}
        options={{
          headerShown: false,
          gestureEnabled: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
      <AppStack.Screen
        name="RemovePlaylistModal"
        component={RemovePlaylistModal}
        options={{
          headerShown: false,
          gestureEnabled: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
      <AppStack.Screen
        name="EntryOptionsModal"
        component={EntryOptionsModal}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
      <AppStack.Screen
        name="PricingOptionsModal"
        component={PricingOptionsModal}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
      <AppStack.Screen
        name="SelectPlaylistModal"
        component={SelectPlaylistModal}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
    </AppStack.Navigator>
  );
};

// const AuthStack = createStackNavigator({
//   Accounts: {
//     screen: AccountsNavigator,
//     navigationOptions: {
//       headerShown: false,
//     },
//     path: ``,
//   },
// });

// const AppStack = createStackNavigator(
//   {
//     Main: {
//       screen: MainTabNavigator,
//       path: ``,
//       navigationOptions: {
//         headerShown: false,
//         gestureEnabled: false,
//       },
//     },
//     EditProfileModal: {
//       screen: EditProfileScreen as any,
//       path: `edit-profile`,
//     },
//     EditPlaylistModal: {
//       screen: EditPlaylistModal,
//       path: `edit-playlist-modal`,
//       navigationOptions: {
//         headerShown: false,
//         gestureEnabled: false,
//         cardStyle: { backgroundColor: 'transparent' },
//       },
//     },
//     UploadMusicModal: {
//       screen: UploadMusicModal,
//       path: `upload-music-modal`,
//       navigationOptions: {
//         headerShown: false,
//         gestureEnabled: false,
//         cardStyle: { backgroundColor: 'transparent' },
//       },
//     },
//     WithdrawalModal: {
//       screen: WithdrawalModal,
//       path: `withdrawal-modal`,
//       navigationOptions: {
//         headerShown: false,
//         gestureEnabled: false,
//         cardStyle: { backgroundColor: 'transparent' },
//       },
//     },
//     BuyOptionsModal: {
//       screen: BuyOptionsModal,
//       path: `buy-options-modal`,
//       navigationOptions: {
//         headerShown: false,
//         gestureEnabled: false,
//         cardStyle: { backgroundColor: 'transparent' },
//       },
//     },
//     RemovePlaylistModal: {
//       screen: RemovePlaylistModal,
//       path: 'remove-playlist',
//       navigationOptions: {
//         headerShown: false,
//         gestureEnabled: false,
//         cardStyle: { backgroundColor: 'transparent' },
//       },
//     },
//     EntryOptionsModal: {
//       screen: EntryOptionsModal,
//       path: `entry-options-modal`,
//       navigationOptions: {
//         headerShown: false,
//         cardStyle: { backgroundColor: 'transparent' },
//       },
//     },
//     PricingOptionsModal: {
//       screen: PricingOptionsModal,
//       path: `pricing-options-modal`,
//       navigationOptions: {
//         headerShown: false,
//         cardStyle: { backgroundColor: 'transparent' },
//       },
//     },
//     SelectPlaylistModal: {
//       screen: SelectPlaylistModal as any,
//       path: `select-playlist-modal`,
//       navigationOptions: {
//         gestureEnabled: false,
//         cardStyle: { backgroundColor: 'transparent' },
//       },
//     },
//   },
//   {
//     mode: 'modal',
//   }
// );

// const createApp = Platform.select({
//   web: (config: any) =>
//     createBrowserApp(config, {
//       history:
//         typeof (global as any).window !== 'undefined' ? 'browser' : 'memory',
//     }),
//   default: (config: any) => createAppContainer(config),
// });

// const RootStackNavigator = createSwitchNavigator({
//   App: {
//     screen: AppStack,
//     path: ``,
//   },
//   Auth: {
//     screen: AuthStack,
//     path: `accounts`,
//   },
//   WebApp: {
//     screen: WebApp,
//     path: ``,
//   },
// });

const Root: NavStatelessComponent = observer(props => {
  setNavigator(props.navigation);

  const [loaded, setLoaded] = useState(false);
  const {
    sessionStore,
    paymentsStore,
    userEntriesStore,
    playlistsStore,
    likesStore,
  } = Stores();

  StatusBar.setBarStyle('light-content');

  const loadResources = async () => {
    const [user] = [
      await sessionStore.loadSession(),
      await Asset.loadAsync(Images),
      await loadResourcesAsync(),
    ];
    return user;
  };

  const loadUserData = async () => {
    [
      await likesStore.refreshLikes(),
      await playlistsStore.refreshPlaylists(),
      await userEntriesStore.refreshEntries(),
      await paymentsStore.refreshSubscription(),
    ];
  };

  const loadAll = async () => {
    const user = await loadResources();
    if (user) {
      console.log('loading user data');
      await loadUserData();
    }
    setLoaded(true);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const ref: any = useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: ['https://skyhitz.io', 'skyhitz://'],
  });

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise(resolve =>
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 150)
      ),
    ])
      .catch(e => {
        console.error(e);
      })
      .then((state: any) => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (loaded && isReady) {
    return (
      <NavigationContainer initialState={initialState} ref={ref}>
        {sessionStore.user ? <AppStackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    );
  }
  return <AuthLoadingScreen />;
});

export default Root;
