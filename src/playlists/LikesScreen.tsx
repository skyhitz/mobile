import React from 'react';
import { ScrollView } from 'react-native';
import EntryRow from 'app/src/ui/EntryRow';
import SearchingLoader from 'app/src/ui/SearchingLoader';
import Colors from 'app/src/constants/Colors';
import BottomPlaceholder from 'app/src/ui/BottomPlaceholder';
import * as L from 'list';
import ResponsiveLayout from '../ui/ResponsiveLayout';
import { LikesStore } from '../stores/likes.store';

export default () => {
  const { userLikes, loading } = LikesStore();
  const loadAndPlay = () => {};
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
              play={loadAndPlay}
              entry={entry}
              disablePlaylistMode={null}
              options={null}
              previousScreen={null}
            />
          ),
          userLikes
        )}
        <BottomPlaceholder />
      </ResponsiveLayout>
    </ScrollView>
  );
};
