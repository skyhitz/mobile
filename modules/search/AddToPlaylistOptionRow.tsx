import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { inject } from 'mobx-react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { navigate } from 'app/modules/navigation/Navigator';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  selectEntryToBeAdded: stores.playlistsStore.selectEntryToBeAdded.bind(
    stores.playlistsStore
  ),
}))
export default class AddToPlaylistOptionRow extends React.Component<any, any> {
  handleAddToPlaylist() {
    this.props.selectEntryToBeAdded(this.props.entry);
    navigate('SelectPlaylistModal');
  }
  render() {
    if (!this.props.entry) {
      return null;
    }
    return (
      <TouchableOpacity onPress={this.handleAddToPlaylist.bind(this)}>
        <View style={styles.field}>
          <MaterialIcons name={'playlist-add'} size={32} color={Colors.white} />
          <Text style={styles.text}>Add to Playlist</Text>
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
