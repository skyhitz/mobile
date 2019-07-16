import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileTopContainer from 'app/modules/profile/ProfileTopContainer';
import ProfileEntryListView from 'app/modules/profile/ProfileEntryListView';
import Colors from 'app/constants/Colors';

export default class ProfileScreen extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.container}>
        <ProfileTopContainer />
        <ProfileEntryListView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.listItemBackground,
    flex: 1,
  },
});
