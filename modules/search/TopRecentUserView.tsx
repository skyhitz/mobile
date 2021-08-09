import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import TopUserSearchView from 'app/modules/search/TopUserSearchView';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import Colors from 'app/constants/Colors';
import ResponsiveLayout from '../ui/ResponsiveLayout';

const TopRecentUserView = () => (
  <ScrollView style={styles.scrollView}>
    <ResponsiveLayout>
      <TopUserSearchView />
      <BottomPlaceholder />
    </ResponsiveLayout>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.listItemBackground,
    flex: 1,
  },
});

export default TopRecentUserView;
