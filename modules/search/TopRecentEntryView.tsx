import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import RecentEntrySearch from 'app/modules/search/RecentEntrySearch';
import TopEntrySearchView from 'app/modules/search/TopEntrySearchView';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import Colors from 'app/constants/Colors';

const TopAndRecentEntryView = () => (
  <ScrollView style={styles.scrollView}>
    <RecentEntrySearch />
    <BottomPlaceholder />
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.listItemBackground,
    flex: 1,
  },
});

export default TopAndRecentEntryView;
