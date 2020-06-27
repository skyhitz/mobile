import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { observer } from 'mobx-react';
import EntryRow from 'app/modules/ui/EntryRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';

export default observer(() => {
  const { playerStore, entriesSearchStore } = Stores();
  const renderItem = ({ item }) => {
    return (
      <EntryRow
        key={item.id}
        play={playerStore.loadAndPlay}
        entry={item}
        addRecentEntrySearch={null}
        options={null}
        disablePlaylistMode={() =>
          playerStore.setPlaylistMode(entriesSearchStore.recentlyAdded)
        }
        previousScreen={null}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.recentText}>Recently Added</Text>
      {SearchingLoader(entriesSearchStore.loadingRecentSearches)}
      <FlatList
        data={entriesSearchStore.recentlyAdded.toArray()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  recentText: {
    color: Colors.defaultTextLight,
    fontSize: 18,
    paddingTop: 14,
    paddingBottom: 12,
    paddingLeft: 20,
  },
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
