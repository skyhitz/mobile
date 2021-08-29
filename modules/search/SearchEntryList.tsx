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

const SearchEntryList = inject((stores: Stores) => ({
  loadPlayAndPushToCueList: stores.playerStore.loadPlayAndPushToCueList.bind(
    stores.playerStore
  ),
  entries: stores.entriesSearchStore.entries,
  searching: stores.entriesSearchStore.searching,
  query: stores.entriesSearchStore.query,
  addRecentEntrySearch: stores.entriesSearchStore.addRecentEntrySearch.bind(
    stores.entriesSearchStore
  ),
  disablePlaylistMode: stores.playerStore.disablePlaylistMode.bind(
    stores.playerStore
  ),
}))(
  ({
    loadPlayAndPushToCueList,
    entries,
    searching,
    query,
    addRecentEntrySearch,
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
              addRecentEntrySearch={addRecentEntrySearch}
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
