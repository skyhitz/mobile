import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import SelectPlaylistRow from 'app/modules/playlists/SelectPlaylistRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import ArrowDownBackBtn from 'app/modules/ui/ArrowDownBackBtn';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  playlists: stores.playlistsStore.playlists,
  loading: stores.playlistsStore.loading,
}))
export default class SelectPlaylistModal extends React.Component<any, any> {
  static navigationOptions = {
    title: 'Select Playlist',
    headerTitleStyle: { color: Colors.white },
    headerStyle: {
      backgroundColor: Colors.headerBackground,
      borderBottomWidth: 0,
    },
    headerTintColor: Colors.tabIconSelected,
    headerLeft: () => <ArrowDownBackBtn />,
  };

  render() {
    return (
      <ScrollView style={styles.listWrap}>
        {SearchingLoader(this.props.loading)}
        {this.props.playlists.map(
          (playlist: { id: string | number | undefined }, index: any) => (
            <SelectPlaylistRow
              key={playlist.id}
              playlist={playlist}
              index={index}
            />
          )
        )}
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
