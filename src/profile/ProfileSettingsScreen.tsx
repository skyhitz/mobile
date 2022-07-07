import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from 'app/src/constants/Colors';
import ProfileSettingsTopContainer from 'app/src/profile/ProfileSettingsTopContainer';
import ShareAppBanner from 'app/src/marketing/ShareAppBanner';
import LikesScreen from 'app/src/playlists/LikesScreen';
import CollectionScreen from 'app/src/playlists/CollectionScreen';
import LikesRow from 'app/src/playlists/LikesRow';
import MyMusicRow from 'app/src/playlists/MyMusicRow';
import ResponsiveLayout from '../ui/ResponsiveLayout';
import MintNFT from './MintNFT';
import { useLinkTo } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import ChevronLeftIcon from 'app/src/ui/icons/chevron-left';
import tw from 'twin.macro';
import { UserEntriesStore } from '../stores/user-entries';
import { LikesStore } from '../stores/likes';
import { PaymentsStore } from '../stores/payments';

const ProfileSettingsScreen = () => {
  let { refreshSubscription, credits } = PaymentsStore();
  const { refreshLikes } = LikesStore();
  const { refreshEntries } = UserEntriesStore();

  useEffect(() => {
    refreshLikes();
    refreshEntries();
    refreshSubscription();
  });

  return (
    <ResponsiveLayout>
      <View style={styles.container}>
        <ProfileSettingsTopContainer />
        <View style={styles.settingsContainer}>
          <LikesRow />
          <MyMusicRow />
          <ShareAppBanner credits={credits} />
        </View>
      </View>
    </ResponsiveLayout>
  );
};

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
            style={tw`text-white`}
            backImage={() => <ChevronLeftIcon color={Colors.white} />}
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
