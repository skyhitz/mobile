import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import EntryRow from 'app/modules/ui/EntryRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';
import ResponsiveLayout from '../ui/ResponsiveLayout';

export default observer((props) => {
  const { playerStore, entriesSearchStore } = Stores();
  const renderItem = (item) => {
    return (
      <EntryRow
        key={item.id}
        play={() => playerStore.loadAndPlay(item)}
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
      <ScrollView style={{ flex: 1 }}>
        <ResponsiveLayout>
          {SearchingLoader(entriesSearchStore.loadingRecentlyAdded)}
          {!entriesSearchStore.recentlyAdded.isEmpty() && (
            <Text style={styles.recentText}>Recently Added</Text>
          )}
          {entriesSearchStore.recentlyAdded.map((entry: any) => {
            return renderItem(entry);
          })}
        </ResponsiveLayout>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  recentText: {
    color: Colors.defaultTextLight,
    fontSize: 18,
    paddingTop: 0,
    paddingBottom: 12,
    paddingLeft: 20,
  },
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1,
  },
});
