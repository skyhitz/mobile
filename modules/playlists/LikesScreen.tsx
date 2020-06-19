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
  entries: stores.likesStore.userLikes,
  loading: stores.likesStore.loading,
}))
export default class LikesScreen extends React.Component<any, any> {
  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: Colors.listItemBackground,
          flex: 1,
        }}
      >
        {SearchingLoader(this.props.loading)}
        {this.props.entries.map((entry: any) => (
          <EntryRow
            key={entry.id}
            play={this.props.loadAndPlay}
            entry={entry}
            addRecentEntrySearch={null}
            disablePlaylistMode={null}
            options={null}
            previousScreen={null}
          />
        ))}
        <BottomPlaceholder />
      </ScrollView>
    );
  }
}
