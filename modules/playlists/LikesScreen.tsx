import React from 'react';
import { ScrollView } from 'react-native';
import { inject } from 'mobx-react/native';
import EntryRow from 'app/modules/ui/EntryRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';

@inject(stores => ({
  loadAndPlay: stores.playerStore.loadAndPlay.bind(stores.playerStore),
  entries: stores.likesStore.userLikes,
  loading: stores.likesStore.loading,
}))
export default class LikesScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: 'Likes',
    headerTitleStyle: { color: Colors.white },
    headerStyle: {
      backgroundColor: Colors.headerBackground,
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
        {this.props.entries.map(entry =>
          EntryRow(this.props.loadAndPlay, entry)
        )}
        <BottomPlaceholder />
      </ScrollView>
    );
  }
}
