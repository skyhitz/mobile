import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { inject } from 'mobx-react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { goBack } from 'app/modules/navigation/Navigator';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  removeEntryFromPlaylist: stores.playlistsStore.removeEntryFromPlaylist.bind(
    stores.playlistsStore
  ),
}))
export default class RemoveFromPlaylistOptionRow extends React.Component<
  any,
  any
> {
  handleRemoveFromPlaylist() {
    this.props.removeEntryFromPlaylist(
      this.props.playlistId,
      this.props.entry.id
    );
    goBack();
  }
  render() {
    if (!this.props.entry) {
      return null;
    }
    return (
      <TouchableOpacity onPress={this.handleRemoveFromPlaylist.bind(this)}>
        <View style={styles.field}>
          <MaterialIcons
            name={'remove-circle-outline'}
            size={30}
            color={Colors.white}
          />
          <Text style={styles.text}>Remove from Playlist</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 50,
    width: Layout.window.width - 60,
  },
  text: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.white,
    paddingLeft: 10,
  },
  textLiked: {
    fontSize: 14,
    textAlign: 'left',
    paddingLeft: 10,
    color: Colors.brandBlue,
  },
});
