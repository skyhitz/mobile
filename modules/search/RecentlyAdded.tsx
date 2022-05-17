import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { observer } from 'mobx-react';
import EntryRow from 'app/modules/ui/EntryRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';
import ResponsiveLayout from '../ui/ResponsiveLayout';
import BottomPlaceholder from '../ui/BottomPlaceholder';

export default observer((props) => {
  const { playerStore, entriesSearchStore } = Stores();
  const [page, setPage] = useState(1);
  const renderItem = (item) => {
    return (
      <EntryRow
        key={item.id}
        play={() => playerStore.loadAndPlay(item)}
        entry={item}
        options={null}
        disablePlaylistMode={() => {
          playerStore.setPlaylistModeFromArray(
            entriesSearchStore.recentlyAdded
          );
        }}
        previousScreen={null}
      />
    );
  };

  const handleLoadMore = () => {
    if (!entriesSearchStore.hasMoreRecentlyAdded) return;
    setPage((oldPage) => oldPage + 1);
    entriesSearchStore.loadMoreRecentlyAdded(page);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveLayout>
        {entriesSearchStore.recentlyAdded.length > 0 && (
          <FlatList
            data={entriesSearchStore.recentlyAdded}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(entry) => entry.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
            ListHeaderComponent={() => (
              <Text style={styles.recentText}>Recently Added</Text>
            )}
            refreshing={entriesSearchStore.loadingRecentlyAdded}
          />
        )}
        {SearchingLoader(entriesSearchStore.loadingRecentlyAdded)}
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
