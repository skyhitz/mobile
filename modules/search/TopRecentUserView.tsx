import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import TopUserSearchView from 'app/modules/search/TopUserSearchView';
import RecentUserSearch from 'app/modules/search/RecentUserSearch';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import Colors from 'app/constants/Colors';

const TopRecentUserView = () => (
  <ScrollView style={styles.scrollView}>
    <TopUserSearchView />
    <RecentUserSearch />
    <BottomPlaceholder />
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.listItemBackground,
    flex: 1,
  },
});

export default TopRecentUserView;
