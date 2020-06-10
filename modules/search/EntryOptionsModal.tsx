import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import { goBack } from 'app/modules/navigation/Navigator';
import LikeOptionRow from 'app/modules/search/LikeOptionRow';
import AddToPlaylistOptionRow from 'app/modules/search/AddToPlaylistOptionRow';
import RemoveFromPlaylistOptionRow from 'app/modules/search/RemoveFromPlaylistOptionRow';
import RemoveFromMyMusicRow from 'app/modules/search/RemoveFromMyMusicRow';
import SetPrice from 'app/modules/search/SetPrice';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;
const adminId = '-LbM3m6WKdVQAsY3zrAd';

@inject((stores: Stores) => ({
  playlistsCount: stores.playlistsStore.playlistsCount,
  user: stores.sessionStore.user,
}))
export default class EntryOptionsModal extends React.Component<any, any> {
  renderAddEntryToPlaylist(entry: any) {
    if (!this.props.playlistsCount) {
      return null;
    }
    return <AddToPlaylistOptionRow entry={entry} />;
  }
  renderRemoveFromPlaylist(
    entry: any,
    options: { removeFromPlaylist: any; playlistId: any }
  ) {
    if (!options) {
      return null;
    }
    const { removeFromPlaylist, playlistId } = options;
    return (
      <RemoveFromPlaylistOptionRow entry={entry} playlistId={playlistId} />
    );
  }
  // Allow admin to remove music in case of copyright issues or not related content uploaded
  renderRemoveFromMyMusic(entry) {
    if (this.props.user.id === adminId) {
      return <RemoveFromMyMusicRow entry={entry} />;
    }
    return null;
  }
  renderSetPrice(entry: any) {
    if (
      this.props.user.displayName === entry.artist ||
      this.props.user.id === adminId
    ) {
      return <SetPrice entry={entry} />;
    }
    return null;
  }
  render() {
    const {
      entry,
      options,
      previousScreen,
    } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={styles.infoWrap}>
          <Image source={{ uri: entry.imageUrl }} style={styles.thumb} />
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {entry.title}
          </Text>
          <Text
            style={styles.artistName}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {entry.artist}
          </Text>
        </View>
        <View style={styles.options}>
          <LikeOptionRow entry={entry} />
          {this.renderAddEntryToPlaylist(entry)}
          {this.renderRemoveFromPlaylist(entry, options)}

          {previousScreen === 'MyMusicScreen'
            ? this.renderRemoveFromMyMusic(entry)
            : null}
          {previousScreen === 'MyMusicScreen'
            ? this.renderSetPrice(entry)
            : null}
        </View>
        <View style={styles.bottomWrap}>
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlueTransparent,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  infoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxHeight: 150,
  },
  options: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  bottomWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    maxHeight: 50,
  },
  thumb: {
    width: 224,
    height: 168,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 40,
  },
  artistName: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    color: Colors.white,
  },
  text: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.white,
    paddingLeft: 10,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
  },
});
