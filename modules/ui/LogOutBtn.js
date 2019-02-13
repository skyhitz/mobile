import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { inject } from 'mobx-react/native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Colors from 'app/constants/Colors';
import { trackSignOut } from 'app/analytics/Tracking';

@inject(stores => ({
  logOut: stores.sessionStore.signOut.bind(stores.sessionStore),
  clearLikes: stores.likesStore.clearLikes.bind(stores.clearLikes),
  clearPlaylists: stores.playlistsStore.clearPlaylists.bind(
    stores.clearPlaylists
  ),
}))
export default class LogOutBtn extends React.Component {
  async handleLogOut() {
    await this.props.logOut();
    this.props.clearLikes();
    this.props.clearPlaylists();
    trackSignOut();
  }
  render() {
    return (
      <TouchableOpacity
        rejectResponderTermination
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
