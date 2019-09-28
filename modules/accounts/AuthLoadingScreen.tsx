import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { inject } from 'mobx-react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import {
  Ionicons,
  FontAwesome,
  EvilIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import { Images } from 'app/assets/images/Images';
import { setNavigator, navigate } from 'app/modules/navigation/Navigator';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  hideTopPadding: stores.playerStore.show,
  loadSession: stores.sessionStore.loadSession.bind(stores.sessionStore),
  user: stores.sessionStore.user,
}))
export default class AuthLoadingScreen extends React.Component<any, any> {
  constructor(props: { navigation: any }) {
    super(props);
    setNavigator(props.navigation);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    await this.loadResourcesAsync();

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigate(this.props.user ? 'ProfileSettings' : 'Auth');
  };

  async loadSessionAndIdentifyUser() {
    let user = await this.props.loadSession();
    if (user) {
      // identifyUser(user);
    }
    return;
  }

  loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync(Images),
      Font.loadAsync({
        'Raleway-Light': require('../../assets/fonts/Raleway-Light.ttf'),
      }),
      Font.loadAsync(Ionicons.font),
      Font.loadAsync(FontAwesome.font),
      Font.loadAsync(MaterialIcons.font),
      Font.loadAsync(EvilIcons.font),
      this.loadSessionAndIdentifyUser(),
    ]);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
  },
});
