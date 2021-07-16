import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import Colors from 'app/constants/Colors';
import ProfileSettingsTopContainer from 'app/modules/profile/ProfileSettingsTopContainer';
import ShareAppBanner from 'app/modules/marketing/ShareAppBanner';
import LikesScreen from 'app/modules/playlists/LikesScreen';
import MyMusicScreen from 'app/modules/playlists/MyMusicScreen';
import LikesRow from 'app/modules/playlists/LikesRow';
import MyMusicRow from 'app/modules/playlists/MyMusicRow';
import { Stores } from 'app/functions/Stores';
import ResponsiveLayout from '../ui/ResponsiveLayout';

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
          <ShareAppBanner />
        </View>
      </View>
    </ResponsiveLayout>
  );
});

const ProfileSettingsStack = createStackNavigator();

const ProfileSettingsNavigator = () => {
  return (
    <ProfileSettingsStack.Navigator>
      <ProfileSettingsStack.Screen
        name="ProfileSettingsScreen"
        component={ProfileSettingsScreen}
        options={{
          title: '',
          headerTintColor: Colors.tabIconSelected,
          headerStyle: {
            backgroundColor: Colors.headerBackground,
            borderBottomWidth: 0,
          },
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
