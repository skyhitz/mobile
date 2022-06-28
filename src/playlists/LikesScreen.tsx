import React from 'react';
import { ScrollView } from 'react-native';
import { inject } from 'mobx-react';
import EntryRow from 'app/src/ui/EntryRow';
import SearchingLoader from 'app/src/ui/SearchingLoader';
import Colors from 'app/src/constants/Colors';
import BottomPlaceholder from 'app/src/ui/BottomPlaceholder';
import * as stores from 'app/src/stores';
import * as L from 'list';
import ResponsiveLayout from '../ui/ResponsiveLayout';
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
        <ResponsiveLayout>
          {SearchingLoader(this.props.loading)}
          {L.map(
            (entry: any) => (
              <EntryRow
                key={entry.id}
                play={this.props.loadAndPlay}
                entry={entry}
                disablePlaylistMode={null}
                options={null}
                previousScreen={null}
              />
            ),
            this.props.entries
          )}
          <BottomPlaceholder />
        </ResponsiveLayout>
      </ScrollView>
    );
  }
}
