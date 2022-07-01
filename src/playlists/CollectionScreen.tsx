import React from 'react';
import { ScrollView } from 'react-native';
import EntryRow from 'app/src/ui/EntryRow';
import SearchingLoader from 'app/src/ui/SearchingLoader';
import Colors from 'app/src/constants/Colors';
import BottomPlaceholder from 'app/src/ui/BottomPlaceholder';
import * as L from 'list';
import ResponsiveLayout from '../ui/ResponsiveLayout';
import { UserEntriesStore } from '../stores/user-entries';

export default () => {
  const { entries, loading } = UserEntriesStore();
  // TO DO: add load and play
  return (
    <ScrollView
      style={{
        backgroundColor: Colors.listItemBackground,
        flex: 1,
      }}
    >
      <ResponsiveLayout>
        {SearchingLoader(loading)}
        {L.map(
          (entry: any) => (
            <EntryRow
              key={entry.id}
              play={() => {}}
              entry={entry}
              options={null}
              disablePlaylistMode={null}
              previousScreen={'CollectionScreen'}
            />
          ),
          entries
        )}
        <BottomPlaceholder />
      </ResponsiveLayout>
    </ScrollView>
  );
};
