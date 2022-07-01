import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { observer } from 'mobx-react';
import EntryRow from 'app/src/ui/EntryRow';
import SearchingLoader from 'app/src/ui/SearchingLoader';
import Colors from 'app/src/constants/Colors';
import { Stores } from 'app/src/functions/Stores';
import ResponsiveLayout from '../ui/ResponsiveLayout';
import BottomPlaceholder from '../ui/BottomPlaceholder';
import { SearchStore } from '../stores/search';

export default observer((props) => {
  const { playerStore } = Stores();
  const {
    recentlyAdded,
    hasMoreRecentlyAdded,
    loadMoreRecentlyAdded,
    loadingRecentlyAdded,
  } = SearchStore();
  const [page, setPage] = useState(1);
  const renderItem = (item) => {
    return (
      <EntryRow
        key={item.id}
        play={() => playerStore.loadAndPlay(item)}
        entry={item}
        options={null}
        disablePlaylistMode={() => {
          playerStore.setPlaylistModeFromArray(recentlyAdded);
        }}
        previousScreen={null}
      />
    );
  };

  const handleLoadMore = () => {
    if (!hasMoreRecentlyAdded) return;
    setPage((oldPage) => oldPage + 1);
    loadMoreRecentlyAdded(page);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveLayout>
        {recentlyAdded.length > 0 && (
          <FlatList
            data={recentlyAdded}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(entry) => entry.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
            ListHeaderComponent={() => (
              <Text style={styles.recentText}>Recently Added</Text>
            )}
            refreshing={loadingRecentlyAdded}
          />
        )}
        {SearchingLoader(loadingRecentlyAdded)}
        <BottomPlaceholder />
      </ResponsiveLayout>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  recentText: {
    color: Colors.defaultTextLight,
    fontSize: 16,
    paddingTop: 2,
    paddingBottom: 12,
    paddingLeft: 20,
  },
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1,
    overflow: 'scroll',
  },
});
