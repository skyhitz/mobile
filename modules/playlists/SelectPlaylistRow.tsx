import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Divider from 'app/modules/ui/Divider';
import Colors from 'app/constants/Colors';
import { navigate } from 'app/modules/navigation/Navigator';
import { EvilIcons } from '@expo/vector-icons';
import { inject } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  addToPlaylist: stores.playlistsStore.addToPlaylist.bind(
    stores.playlistsStore
  ),
}))
export default class SelectPlaylistRow extends React.Component<any, any> {
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
    this.props.addToPlaylist(this.props.playlist.id);
    navigate('Main', {
      screen: 'ProfileSettings',
    });
  }

  render() {
    return (
      <View style={styles.rowWrap}>
        <View style={styles.rowWrap}>
          <TouchableOpacity onPress={this.handleNavigation.bind(this)}>
            <View style={styles.row}>
              <View style={styles.leftSection}>
                <Image
                  source={{ uri: this.props.playlist.photoUrl }}
                  style={styles.thumb}
                />
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
