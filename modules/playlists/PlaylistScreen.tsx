import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { inject } from 'mobx-react';
import EntryRow from 'app/modules/ui/EntryRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import { navigate } from 'app/modules/navigation/Navigator';
import LargeBtn from 'app/modules/ui/LargeBtn';
import * as stores from 'skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  loadAndPlay: stores.playerStore.loadAndPlay.bind(stores.playerStore),
  playlist: stores.playlistsStore.playlist,
  loading: stores.playlistsStore.loading,
}))
export default class PlaylistScreen extends React.Component<any, any> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerTitleStyle: { color: Colors.white },
    headerStyle: {
      backgroundColor: Colors.headerBackground,
      borderBottomWidth: 0,
    },
    headerTintColor: Colors.tabIconSelected,
  });
  navigateToSearch() {
    navigate('SearchNavigator');
  }
  renderInstructionsToAddPlaylist() {
    if (this.props.playlist.entriesCount !== 0) {
      return null;
    }
    return (
      <View style={styles.emptyViewWrap}>
        <Text style={styles.title}>
          Do you want to add videos to this playlist?
        </Text>
        <Text style={styles.description}>
          Press the button next to a video and select "Add to playlist"
        </Text>
        <LargeBtn text="EXPLORE" onPress={this.navigateToSearch} />
      </View>
    );
  }
  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: Colors.listItemBackground,
          flex: 1,
        }}
      >
        {this.renderInstructionsToAddPlaylist()}
        {SearchingLoader(this.props.loading)}
        {this.props.playlist.entries.map(entry =>
          EntryRow(this.props.loadAndPlay, entry, null, {
            removeFromPlaylist: true,
            playlistId: this.props.playlist.id,
          })
        )}
        <BottomPlaceholder />
      </ScrollView>
    );
  }
}

let styles = StyleSheet.create({
  emptyViewWrap: {
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.defaultTextDark,
    marginBottom: 20,
    maxWidth: 250,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.defaultTextDark,
    maxWidth: 250,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: Colors.brandBlue,
    width: 200,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
