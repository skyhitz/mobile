import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { inject } from 'mobx-react';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import PlaylistRow from 'app/modules/playlists/PlaylistRow';
import EditPlaylistsBtn from 'app/modules/ui/EditPlaylistsBtn';
import EditPlaylistsBackBtn from 'app/modules/ui/EditPlaylistsBackBtn';
import { navigate } from 'app/modules/navigation/Navigator';
import LargeBtn from 'app/modules/ui/LargeBtn';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  loadAndPlay: stores.playerStore.loadAndPlay.bind(stores.playerStore),
  playlists: stores.playlistsStore.playlists,
  loading: stores.playlistsStore.loading,
  create: stores.playlistsStore.create.bind(stores.playlistsStore),
  modalPlaylistName: stores.playlistsStore.modalPlaylistName,
  modalPlaylistDescription: stores.playlistsStore.modalPlaylistDescription,
  updateModalPlaylistName: stores.playlistsStore.updateModalPlaylistName.bind(
    stores.playlistsStore
  ),
  updateModalPlaylistDescription: stores.playlistsStore.updateModalPlaylistDescription.bind(
    stores.playlistsStore
  ),
  canCreate: stores.playlistsStore.canCreate,
}))
export default class PlaylistsScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: 'Playlists',
    headerTitleStyle: { color: Colors.white },
    headerStyle: {
      backgroundColor: Colors.headerBackground,
      borderBottomWidth: 0,
    },
    headerTintColor: Colors.tabIconSelected,
    headerRight: () => <EditPlaylistsBtn />,
    headerLeft: () => <EditPlaylistsBackBtn />,
  };

  showModal() {
    navigate('EditPlaylistModal');
  }

  render() {
    return (
      <ScrollView style={styles.listWrap}>
        {SearchingLoader(this.props.loading)}
        {this.props.playlists.map(
          (playlist: { id: string | number | undefined }, index: any) => (
            <PlaylistRow key={playlist.id} playlist={playlist} index={index} />
          )
        )}
        <View style={styles.btnWrap}>
          <LargeBtn text="CREATE PLAYLIST" onPress={this.showModal} />
        </View>
        <BottomPlaceholder />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  btnWrap: {
    flex: 1,
    backgroundColor: Colors.listItemBackground,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 100,
    marginTop: 20,
  },
  listWrap: {
    backgroundColor: Colors.listItemBackground,
    flex: 1,
  },
});
