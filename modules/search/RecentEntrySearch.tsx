import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import EntryRow from 'app/modules/ui/EntryRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import { Stores } from 'skyhitz-common';

@inject((stores: Stores) => ({
  loadPlayAndPushToCueList: stores.playerStore.loadPlayAndPushToCueList.bind(
    stores.playerStore
  ),
  getRecentSearches: stores.entriesSearchStore.getRecentSearches.bind(
    stores.entriesSearchStore
  ),
  recentSearches: stores.entriesSearchStore.recentSearches,
  loadingRecentSearches: stores.entriesSearchStore.loadingRecentSearches,
  disablePlaylistMode: stores.playerStore.disablePlaylistMode.bind(
    stores.playerStore
  ),
}))
export default class RecentEntrySearch extends React.Component<any, any> {
  componentWillMount() {
    this.props.getRecentSearches();
  }
  render() {
    if (!this.props.loadingRecentSearches && !this.props.recentSearches.size) {
      return null;
    }
    return (
      <View>
        <Text style={styles.recentText}>Recent</Text>
        {SearchingLoader(this.props.loadingRecentSearches)}
        {this.props.recentSearches.map(entry =>
          EntryRow(
            this.props.loadPlayAndPushToCueList,
            entry,
            null,
            null,
            this.props.disablePlaylistMode
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
