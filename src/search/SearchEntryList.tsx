import React from 'react';
import { ScrollView } from 'react-native';
import EntryRow from 'app/src/ui/EntryRow';
import SearchingLoader from 'app/src/ui/SearchingLoader';
import Colors from 'app/src/constants/Colors';
import BottomPlaceholder from 'app/src/ui/BottomPlaceholder';
import ResponsiveLayout from '../ui/ResponsiveLayout';
import { SearchStore } from '../stores/search';

const SearchEntryList = () => {
  const { searching, entries } = SearchStore();
  const query = '';
  const loadPlayAndPushToCueList = () => {};
  const disablePlaylistMode = () => {};

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.listItemBackground,
        flex: 1,
      }}
    >
      <ResponsiveLayout>
        {SearchingLoader(searching, query)}
        {entries.map((entry: any) => (
          <EntryRow
            key={entry.id}
            play={loadPlayAndPushToCueList}
            entry={entry}
            options={null}
            disablePlaylistMode={disablePlaylistMode}
            previousScreen={null}
          />
        ))}
        <BottomPlaceholder />
      </ResponsiveLayout>
    </ScrollView>
  );
};

export default SearchEntryList;
