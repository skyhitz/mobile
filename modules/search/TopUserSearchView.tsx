import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import UserRow from 'app/modules/ui/UserRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import * as L from 'list';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  getTopSearches: stores.usersSearchStore.getTopSearches.bind(
    stores.usersSearchStore
  ),
  topSearches: stores.usersSearchStore.topSearches,
  loadingTopSearches: stores.usersSearchStore.loadingTopSearches,
}))
export default class TopUserSearchView extends React.Component<any, any> {
  componentDidMount() {
    this.props.getTopSearches();
  }
  render() {
    if (!this.props.loadingTopSearches && !this.props.topSearches.size) {
      return null;
    }
    return (
      <View>
        <Text style={styles.recentText}>TOP</Text>
        {SearchingLoader(this.props.loadingTopSearches)}
        {L.map(
          (user: { id: string | number | undefined }) => (
            <UserRow user={user} key={user.id} />
          ),
          this.props.topSearches
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recentText: {
    color: Colors.defaultTextLight,
    fontSize: 14,
    paddingTop: 10,
    paddingLeft: 10,
  },
});
