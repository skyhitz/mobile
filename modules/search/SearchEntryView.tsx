import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import SearchEntryList from 'app/modules/search/SearchEntryList';
import RecentlyAdded from 'app/modules/search/RecentlyAdded';
import { useFocusEffect } from '@react-navigation/native';
import { Stores } from 'app/functions/Stores';
import * as L from 'list';

export default observer(() => {
  let { entriesSearchStore, inputSearchStore, playerStore } = Stores();

  useFocusEffect(
    useCallback(() => {
      inputSearchStore.updateSearchType('entries');
    }, [])
  );

  const handleRecentlyAdded = async () => {
    await entriesSearchStore.getRecentlyAdded();
    let entry = L.first(entriesSearchStore.recentlyAdded);
    if (!entry) return;
    await playerStore.loadAndPlay(entry, false);
  };

  useEffect(() => {
    handleRecentlyAdded();
  }, []);

  if (entriesSearchStore.active) {
    return <SearchEntryList />;
  }
  return <RecentlyAdded />;
});
