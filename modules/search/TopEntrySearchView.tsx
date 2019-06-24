import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import EntryRow from 'app/modules/ui/EntryRow';
import { Stores } from 'skyhitz-common';

@inject((stores:Stores) => ({
  loadPlayAndPushToCueList: stores.playerStore.loadPlayAndPushToCueList.bind(
    stores.playerStore
  ),
  getTopSearches: stores.entriesSearchStore.getTopSearches.bind(
    stores.entriesSearchStore
  ),
  topSearches: stores.entriesSearchStore.topSearches,
  loadingTopSearches: stores.entriesSearchStore.loadingTopSearches,
  disablePlaylistMode: stores.playerStore.disablePlaylistMode.bind(
    stores.playerStore
  ),
}))
export default class TopEntrySearchView extends React.Component<any, any> {
  componentWillMount() {
    this.props.getTopSearches();
  }
  render() {
    if (!this.props.loadingTopSearches && !this.props.topSearches.size) {
      return null;
    }
    return (
      <View>
        <Text style={styles.recentText}>TOP</Text>
        {SearchingLoader(this.props.loadingTopSearches)}
        {this.props.topSearches.map(entry =>
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
    paddingTop: 10,
    paddingLeft: 8,
  },
});
