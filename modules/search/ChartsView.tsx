import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text } from 'react-native';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import Colors from 'app/constants/Colors';
import SearchingLoader from '../ui/SearchingLoader';
import EntryChartRow from '../ui/EntryChartRow';
import ResponsiveLayout from '../ui/ResponsiveLayout';
import { Stores } from 'app/functions/Stores';
import { observer } from 'mobx-react';

export default observer((props) => {
  const { playerStore, entriesSearchStore } = Stores();
  const [page, setPage] = useState(0);
  const renderItem = (item, index) => {
    return (
      <EntryChartRow
        key={item.id}
        play={() => playerStore.loadAndPlay(item)}
        entry={item}
        options={null}
        disablePlaylistMode={() =>
          playerStore.setPlaylistModeFromArray(entriesSearchStore.topChart)
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
    if (!entriesSearchStore.hasMoreTopChart) return;
    setPage((oldPage) => oldPage + 1);
    entriesSearchStore.loadMoreTopChart(page);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveLayout>
        {entriesSearchStore.topChart.length > 0 && (
          <FlatList
            data={entriesSearchStore.topChart}
            renderItem={({ item, index }) => renderItem(item, index)}
            keyExtractor={(entry) => entry.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
            ListHeaderComponent={() => (
              <Text style={styles.recentText}>Top Beats</Text>
            )}
            refreshing={entriesSearchStore.loadingTopChart}
          />
        )}
        {SearchingLoader(entriesSearchStore.loadingTopChart)}
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
