import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import Colors from 'app/constants/Colors';
import * as stores from 'app/skyhitz-common';
import * as L from 'list';
import { inject } from 'mobx-react';
import SearchingLoader from '../ui/SearchingLoader';
import EntryChartRow from '../ui/EntryChartRow';
import ResponsiveLayout from '../ui/ResponsiveLayout';
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

  render() {
    if (!this.props.loadingTopChart && !this.props.topChart.length) {
      return null;
    }
    return (
      <View>
        <Text style={styles.recentText}>Top Beats</Text>
        {SearchingLoader(this.props.loadingTopChart)}
        {L.toArray(this.props.topChart).map((entry: any, index: number) => (
          <EntryChartRow
            key={entry.id}
            play={this.props.loadAndPlay}
            entry={entry}
            options={null}
            disablePlaylistMode={() => this.setRecentlyAdded()}
            previousScreen={null}
            position={index + 1}
          />
        ))}
      </View>
    );
  }
}

const ChartsView = () => (
  <ScrollView style={styles.scrollView}>
    <ResponsiveLayout>
      <TopEntries />
      <BottomPlaceholder />
    </ResponsiveLayout>
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
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
});

export default ChartsView;
