import React from 'react';
import { ScrollView } from 'react-native';
import { inject } from 'mobx-react';
import EntryRow from 'app/modules/ui/EntryRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import * as stores from 'app/skyhitz-common';
import * as L from 'list';
import ResponsiveLayout from '../ui/ResponsiveLayout';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  loadAndPlay: stores.playerStore.loadAndPlay.bind(stores.playerStore),
  entries: stores.userEntriesStore.entries,
  loading: stores.userEntriesStore.loading,
}))
export default class CollectionScreen extends React.Component<any, any> {
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
                options={null}
                disablePlaylistMode={null}
                previousScreen={'CollectionScreen'}
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
