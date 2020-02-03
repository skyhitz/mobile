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
  getRecentSearches: stores.entriesSearchStore.getRecentSearches.bind(
    stores.entriesSearchStore
  ),
  recentSearches: stores.entriesSearchStore.recentSearches,
  loadingRecentSearches: stores.entriesSearchStore.loadingRecentSearches,
  setPlaylistMode: stores.playerStore.setPlaylistMode.bind(stores.playerStore)
}))
export default class RecentEntrySearch extends React.Component<any, any> {
  setRecentSearches() {
    this.props.setPlaylistMode(this.props.recentSearches);
  }
  UNSAFE_componentWillMount() {
    this.props.getRecentSearches();
  }
  render() {
    if (!this.props.loadingRecentSearches && !this.props.recentSearches.size) {
      return null;
    }
    return (
      <View>
        <Text style={styles.recentText}>Recent Searches</Text>
        {SearchingLoader(this.props.loadingRecentSearches)}
        {this.props.recentSearches.map((entry: any) =>
          EntryRow(
            this.props.loadAndPlay,
            entry,
            null,
            null,
            () => { this.setRecentSearches() }
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
