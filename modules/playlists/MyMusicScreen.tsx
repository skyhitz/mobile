import React from 'react';
import { ScrollView } from 'react-native';
import { inject } from 'mobx-react';
import EntryRow from 'app/modules/ui/EntryRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  loadAndPlay: stores.playerStore.loadAndPlay.bind(stores.playerStore),
  entries: stores.userEntriesStore.entries,
  loading: stores.userEntriesStore.loading,
}))
export default class MyMusicScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: 'My Music',
    headerTitleStyle: { color: Colors.white },
    headerStyle: {
      backgroundColor: Colors.headerBackground,
      borderBottomWidth: 0,
    },
    headerTintColor: Colors.tabIconSelected,
  };
  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: Colors.listItemBackground,
          flex: 1,
        }}
      >
        {SearchingLoader(this.props.loading)}
        {this.props.entries.map((entry: any) =>
          EntryRow(this.props.loadAndPlay, entry)
        )}
        <BottomPlaceholder />
      </ScrollView>
    );
  }
}
