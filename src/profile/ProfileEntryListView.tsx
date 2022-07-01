import React from 'react';
import { ScrollView } from 'react-native';
import EntryRow from 'app/src/ui/EntryRow';
import SearchingLoader from 'app/src/ui/SearchingLoader';
import Colors from 'app/src/constants/Colors';
import BottomPlaceholder from 'app/src/ui/BottomPlaceholder';
import ProfileStore from '../stores/profile';

const ProfileEntryListView = () => {
  const { profileEntries, loadingEntries } = ProfileStore();
  const loadAndPlay = () => {};

  return (
    <ScrollView style={{ backgroundColor: Colors.listItemBackground, flex: 1 }}>
      {SearchingLoader(loadingEntries)}
      {profileEntries.map((entry: any) => (
        <EntryRow
          key={entry.id}
          play={loadAndPlay}
          entry={entry}
          disablePlaylistMode={null}
          options={null}
          previousScreen={null}
        />
      ))}
      <BottomPlaceholder />
    </ScrollView>
  );
};

export default ProfileEntryListView;
