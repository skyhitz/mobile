import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text } from 'react-native';
import BottomPlaceholder from 'app/src/ui/BottomPlaceholder';
import Colors from 'app/src/constants/Colors';
import SearchingLoader from '../ui/SearchingLoader';
import EntryChartRow from '../ui/EntryChartRow';
import ResponsiveLayout from '../ui/ResponsiveLayout';
import { Stores } from 'app/src/functions/Stores';
import { observer } from 'mobx-react';
import { SearchStore } from '../stores/search';

export default observer((props) => {
  const { playerStore } = Stores();
  const {
    topChart,
    hasMoreTopChart,
    loadMoreTopChart,
    loadingTopChart,
  } = SearchStore();
  const [page, setPage] = useState(0);
  const renderItem = (item, index) => {
    return (
      <EntryChartRow
        key={item.id}
        play={() => playerStore.loadAndPlay(item)}
        entry={item}
        options={null}
        disablePlaylistMode={() =>
          playerStore.setPlaylistModeFromArray(topChart)
        }
        previousScreen={null}
        position={index + 1}
      />
    );
  };

  useEffect(() => {
    handleLoadMore();
  }, []);

  const handleLoadMore = () => {
    if (!hasMoreTopChart) return;
    setPage((oldPage) => oldPage + 1);
    loadMoreTopChart(page);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveLayout>
        {topChart.length > 0 && (
          <FlatList
            data={topChart}
            renderItem={({ item, index }) => renderItem(item, index)}
            keyExtractor={(entry) => entry.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
            ListHeaderComponent={() => (
              <Text style={styles.recentText}>Top Beats</Text>
            )}
            refreshing={loadingTopChart}
          />
        )}
        {SearchingLoader(loadingTopChart)}
        <BottomPlaceholder />
      </ResponsiveLayout>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1,
    overflow: 'scroll',
  },
  recentText: {
    color: Colors.defaultTextLight,
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
  },
});
