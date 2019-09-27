import React from 'react';
import { ScrollView } from 'react-native';
import { inject } from 'mobx-react';
import EntryRow from 'app/modules/ui/EntryRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

const ProfileEntryListView = inject((stores: Stores) => ({
  loadAndPlay: stores.playerStore.loadAndPlay.bind(stores.playerStore),
  entries: stores.profileStore.entries,
  loading: stores.profileStore.loadingEntries,
}))(({ loadAndPlay, entries, loading }: any) => (
  <ScrollView style={{ backgroundColor: Colors.listItemBackground, flex: 1 }}>
    {SearchingLoader(loading)}
    {entries.map((entry: any) => EntryRow(loadAndPlay, entry))}
    <BottomPlaceholder />
  </ScrollView>
));

export default ProfileEntryListView;
