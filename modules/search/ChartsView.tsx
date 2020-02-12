import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import Colors from 'app/constants/Colors';
import * as stores from 'app/skyhitz-common';
import { inject } from 'mobx-react';
import SearchingLoader from '../ui/SearchingLoader';
import EntryChartRow from '../ui/EntryChartRow';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  loadAndPlay: stores.playerStore.loadAndPlay.bind(stores.playerStore),
  getTopChart: stores.entriesSearchStore.getTopChart.bind(
    stores.entriesSearchStore
  ),
  topChart: stores.entriesSearchStore.topChart,
  loadingTopChart: stores.entriesSearchStore.loadingTopChart,
  setPlaylistMode: stores.playerStore.setPlaylistMode.bind(stores.playerStore),
}))
class TopEntries extends React.Component<any, any> {
  setRecentlyAdded() {
    this.props.setPlaylistMode(this.props.topChart);
  }
  componentDidMount() {
    this.props.getTopChart();
  }
  renderEntryRow(entry: any, index: number) {
    return EntryChartRow(
      this.props.loadAndPlay,
      entry,
      null,
      null,
      () => {
        this.setRecentlyAdded();
      },
      null,
      index + 1
    );
  }
  render() {
    if (!this.props.loadingTopChart && !this.props.topChart.size) {
      return null;
    }
    return (
      <View>
        <Text style={styles.recentText}>Top Beats</Text>
        {SearchingLoader(this.props.loadingTopChart)}
        {this.props.topChart.map((entry: any, index: number) =>
          this.renderEntryRow(entry, index)
        )}
      </View>
    );
  }
}

const ChartsView = () => (
  <ScrollView style={styles.scrollView}>
    <TopEntries />
    <BottomPlaceholder />
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.listItemBackground,
    flex: 1,
  },
  chartRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numbersText: {
    color: Colors.defaultTextLight,
    fontSize: 30,
  },
  recentText: {
    color: Colors.defaultTextLight,
    fontSize: 30,
    paddingTop: 60,
    paddingBottom: 20,
    paddingLeft: 20,
  },
});

export default ChartsView;
