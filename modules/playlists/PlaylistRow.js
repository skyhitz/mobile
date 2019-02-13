import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, EvilIcons, Ionicons } from '@expo/vector-icons';
import { inject } from 'mobx-react/native';
import Divider from 'app/modules/ui/Divider';
import Colors from 'app/constants/Colors';
import { navigate } from 'app/modules/navigation/Navigator';
import { UserAvatar } from 'app/modules/ui/UserAvatar';
import { trackOpenProfile } from 'app/analytics/Tracking';

@inject(stores => ({
  setPlaylistMode: stores.playerStore.setPlaylistMode.bind(stores.playerStore),
  setPlaylistIndex: stores.playlistsStore.setPlaylistIndex.bind(
    stores.playlistsStore
  ),
  setRemovePlaylistIndex: stores.playlistsStore.setRemovePlaylistIndex.bind(
    stores.playlistsStore
  ),
  editMode: stores.playlistsStore.editMode,
}))
export default class PlaylistRow extends React.Component {
  get entries() {
    return this.props.playlist.entries;
  }

  get count() {
    return this.props.playlist.entriesCount;
  }

  copy() {
    if (!this.count) {
      return null;
    }
    if (this.count === 1) {
      return '1 Video';
    }
    return `${this.count} Videos`;
  }

  handleNavigation() {
    this.props.setPlaylistIndex(this.props.index);
    navigate('PlaylistScreen', { title: this.props.playlist.title });
    this.props.setPlaylistMode(this.entries);
  }

  showDeleteModal() {
    this.props.setRemovePlaylistIndex(this.props.index);
    navigate('RemovePlaylistModal');
  }

  renderLeftSection() {
    if (this.props.editMode) {
      return (
        <TouchableOpacity onPress={this.showDeleteModal.bind(this)}>
          <MaterialIcons
            name={'remove-circle'}
            size={30}
            color={Colors.errorBackground}
          />
        </TouchableOpacity>
      );
    }
    return (
      <Image
        source={{ uri: this.props.playlist.photoUrl }}
        style={styles.thumb}
      />
    );
  }

  render() {
    return (
      <View style={styles.rowWrap}>
        <View style={styles.rowWrap}>
          <TouchableOpacity onPress={this.handleNavigation.bind(this)}>
            <View style={styles.row}>
              <View style={styles.leftSection}>
                {this.renderLeftSection()}
                <Text style={styles.likesText}>
                  {this.props.playlist.title}
                </Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.videosText}>{this.copy()}</Text>
                <EvilIcons
                  name={'chevron-right'}
                  size={36}
                  color={Colors.defaultTextLight}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Divider />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  rowWrap: {
    flex: 1,
    backgroundColor: Colors.listItemBackground,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingTop: 9,
    paddingBottom: 6,
    paddingLeft: 10,
    backgroundColor: Colors.listItemBackground,
  },
  thumb: {
    margin: 1,
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  leftSection: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  rightSection: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  likesText: {
    fontWeight: 'bold',
    color: Colors.defaultTextDark,
    paddingLeft: 15,
  },
  videosText: {
    color: Colors.defaultTextDark,
    paddingLeft: 5,
  },
});
