import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import Colors from 'app/constants/Colors';
import ProfileSettingsTopContainer from 'app/modules/profile/ProfileSettingsTopContainer';
import ShareAppBanner from 'app/modules/marketing/ShareAppBanner';
import LikesScreen from 'app/modules/playlists/LikesScreen';
import CollectionScreen from 'app/modules/playlists/CollectionScreen';
import LikesRow from 'app/modules/playlists/LikesRow';
import MyMusicRow from 'app/modules/playlists/MyMusicRow';
import { Stores } from 'app/functions/Stores';
import ResponsiveLayout from '../ui/ResponsiveLayout';
import MintNFT from './MintNFT';
import { useLinkTo } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';

const ProfileSettingsScreen = observer(() => {
  let { likesStore, userEntriesStore, paymentsStore } = Stores();
  useEffect(() => {
    likesStore.refreshLikes();
    userEntriesStore.refreshEntries();
    paymentsStore.refreshSubscription();
  });

  return (
    <ResponsiveLayout>
      <View style={styles.container}>
        <ProfileSettingsTopContainer />
        <View style={styles.settingsContainer}>
          <LikesRow />
          <MyMusicRow />
          <ShareAppBanner credits={paymentsStore.credits} />
        </View>
      </View>
    </ResponsiveLayout>
  );
});

const ProfileSettingsStack = createStackNavigator();

const ProfileSettingsNavigator = () => {
  let linkTo = useLinkTo();

  return (
    <ProfileSettingsStack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <HeaderBackButton
            onPress={() => {
              linkTo('/dashboard/profile');
            }}
            tintColor={Colors.white}
          />
        ),
      })}
    >
      <ProfileSettingsStack.Screen
        name="ProfileSettingsScreen"
        getComponent={() => ProfileSettingsScreen}
        options={{
          title: '',
          headerTintColor: Colors.tabIconSelected,
          headerStyle: {
            backgroundColor: Colors.headerBackground,
            borderBottomWidth: 0,
          },
          headerShown: false,
        }}
      />
      <ProfileSettingsStack.Screen
        name="LikesScreen"
        getComponent={() => LikesScreen}
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
        name="CollectionScreen"
        getComponent={() => CollectionScreen}
        options={{
          title: 'Collection',
          headerTitleStyle: { color: Colors.white },
          headerStyle: {
            backgroundColor: Colors.headerBackground,
            borderBottomWidth: 0,
          },
          headerTintColor: Colors.tabIconSelected,
        }}
      />
      <ProfileSettingsStack.Screen
        name="MintNFT"
        getComponent={() => MintNFT}
        options={{
          title: 'Mint NFT',
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
