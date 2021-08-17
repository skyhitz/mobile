import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileTopContainer from 'app/modules/profile/ProfileTopContainer';
import ProfileEntryListView from 'app/modules/profile/ProfileEntryListView';
import Colors from 'app/constants/Colors';
import ResponsiveLayout from '../ui/ResponsiveLayout';

export default class ProfileScreen extends React.Component<any, any> {
  render() {
    return (
      <ResponsiveLayout>
        <View style={styles.container}>
          <ProfileTopContainer />
          <ProfileEntryListView />
        </View>
      </ResponsiveLayout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.listItemBackground,
    flex: 1,
  },
});
