import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import { goBack } from 'app/modules/navigation/Navigator';
import Layout from 'app/constants/Layout';
import LikeOptionRow from 'app/modules/search/LikeOptionRow';
import AddToPlaylistOptionRow from 'app/modules/search/AddToPlaylistOptionRow';
import RemoveFromPlaylistOptionRow from 'app/modules/search/RemoveFromPlaylistOptionRow';
import RemoveFromMyMusicRow from 'app/modules/search/RemoveFromMyMusicRow';
import { Stores } from 'skyhitz-common';
const adminId = '-LbM3m6WKdVQAsY3zrAd';

@inject((stores: Stores) => ({
  playlistsCount: stores.playlistsStore.playlistsCount,
  user: stores.sessionStore.user,
}))
export default class EntryOptionsModal extends React.Component<any, any> {
  renderAddEntryToPlaylist(entry) {
    if (!this.props.playlistsCount) {
      return null;
    }
    return <AddToPlaylistOptionRow entry={entry} />;
  }
  renderRemoveFromPlaylist(entry, options) {
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
    if (
      this.props.user.username === entry.userUsername ||
      this.props.user.id === adminId
    ) {
      return <RemoveFromMyMusicRow entry={entry} />;
    }
    return null;
  }
  render() {
    const { entry, options } = this.props.navigation.state.params;

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
            {entry.userDisplayName}
          </Text>
        </View>
        <View style={styles.options}>
          <LikeOptionRow entry={entry} />
          {this.renderAddEntryToPlaylist(entry)}
          {this.renderRemoveFromPlaylist(entry, options)}
          {this.renderRemoveFromMyMusic(entry)}
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
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  infoWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxHeight: 260,
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
  options: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-around',
    maxHeight: 150,
  },
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    width: Layout.window.width - 60,
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
  bottomWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 50,
  },
});
