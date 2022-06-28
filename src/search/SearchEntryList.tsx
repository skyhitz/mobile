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

const SearchEntryList = inject((stores: Stores) => ({
  loadPlayAndPushToCueList: stores.playerStore.loadPlayAndPushToCueList.bind(
    stores.playerStore
  ),
  entries: stores.entriesSearchStore.entries,
  searching: stores.entriesSearchStore.searching,
  query: stores.entriesSearchStore.query,
  disablePlaylistMode: stores.playerStore.disablePlaylistMode.bind(
    stores.playerStore
  ),
}))(
  ({
    loadPlayAndPushToCueList,
    entries,
    searching,
    query,
    disablePlaylistMode,
  }: any) => (
    <ScrollView
      style={{
        backgroundColor: Colors.listItemBackground,
        flex: 1,
      }}
    >
      <ResponsiveLayout>
        {SearchingLoader(searching, query)}

        {L.map(
          (entry: any) => (
            <EntryRow
              key={entry.id}
              play={loadPlayAndPushToCueList}
              entry={entry}
              options={null}
              disablePlaylistMode={disablePlaylistMode}
              previousScreen={null}
            />
          ),
          entries
        )}
        <BottomPlaceholder />
      </ResponsiveLayout>
    </ScrollView>
  )
);

export default SearchEntryList;
