import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import EntryRow from 'app/modules/ui/EntryRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  loadAndPlay: stores.playerStore.loadAndPlay.bind(
    stores.playerStore
  ),
  getRecentlyAdded: stores.entriesSearchStore.getRecentlyAdded.bind(
    stores.entriesSearchStore
  ),
  recentlyAdded: stores.entriesSearchStore.recentlyAdded,
  loadingRecentlyAdded: stores.entriesSearchStore.loadingRecentlyAdded,
  setPlaylistMode: stores.playerStore.setPlaylistMode.bind(stores.playerStore)
}))
export default class RecentlyAdded extends React.Component<any, any> {
  setRecentlyAdded() {
    this.props.setPlaylistMode(this.props.recentlyAdded);
  }
  UNSAFE_componentWillMount() {
    this.props.getRecentlyAdded();
  }
  render() {
    if (!this.props.loadingRecentlyAdded && !this.props.recentlyAdded.size) {
      return null;
    }
    return (
      <View>
        <Text style={styles.recentText}>Recently Added</Text>
        {SearchingLoader(this.props.loadingRecentSearches)}
        {this.props.recentlyAdded.map((entry: any) =>
          EntryRow(
            this.props.loadAndPlay,
            entry,
            null,
            null,
            () => { this.setRecentlyAdded() }
          )
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recentText: {
    color: Colors.defaultTextLight,
    fontSize: 14,
    paddingTop: 14,
    paddingLeft: 8,
  },
});
