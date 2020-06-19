import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import RecentlyAdded from 'app/modules/search/RecentlyAdded';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import Colors from 'app/constants/Colors';

const TopAndRecentEntryView = () => (
  <ScrollView style={styles.scrollView}>
    <RecentlyAdded />
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
