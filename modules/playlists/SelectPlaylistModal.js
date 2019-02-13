import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { inject } from 'mobx-react/native';
import SelectPlaylistRow from 'app/modules/playlists/SelectPlaylistRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import EditPlaylistsBackBtn from 'app/modules/ui/EditPlaylistsBackBtn';
import SelectPlaylistImage from 'app/modules/playlists/SelectPlaylistImage';
import Layout from 'app/constants/Layout';
import { navigate } from 'app/modules/navigation/Navigator';
import ArrowDownBackBtn from 'app/modules/ui/ArrowDownBackBtn';

@inject(stores => ({
  playlists: stores.playlistsStore.playlists,
  loading: stores.playlistsStore.loading,
}))
export default class SelectPlaylistModal extends React.Component {
  static navigationOptions = {
    title: 'Select Playlist',
    headerTitleStyle: { color: Colors.white },
    headerStyle: {
      backgroundColor: Colors.headerBackground,
    },
    headerTintColor: Colors.tabIconSelected,
    headerLeft: <ArrowDownBackBtn />,
  };

  render() {
    return (
      <ScrollView style={styles.listWrap}>
        {SearchingLoader(this.props.loading)}
        {this.props.playlists.map((playlist, index) => (
          <SelectPlaylistRow
            key={playlist.id}
            playlist={playlist}
            index={index}
          />
        ))}
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
    top: 20,
  },
  listWrap: {
    backgroundColor: Colors.listItemBackground,
    flex: 1,
  },
});
