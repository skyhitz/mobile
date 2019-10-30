import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { inject } from 'mobx-react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Colors from 'app/constants/Colors';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  logOut: stores.sessionStore.signOut.bind(stores.sessionStore),
  clearLikes: stores.likesStore.clearLikes.bind(stores.likesStore.clearLikes),
  clearPlaylists: stores.playlistsStore.clearPlaylists.bind(
    stores.playlistsStore.clearPlaylists
  ),
}))
export default class LogOutBtn extends React.Component<any, any> {
  async handleLogOut() {
    await this.props.logOut();
    this.props.clearLikes();
    this.props.clearPlaylists();
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={this.handleLogOut.bind(this)}
      >
        <Ionicons name={'ios-log-out'} size={24} color={Colors.white} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingRight: 10,
  },
});
