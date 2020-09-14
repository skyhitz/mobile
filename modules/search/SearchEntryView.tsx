import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import SearchEntryList from 'app/modules/search/SearchEntryList';
import RecentlyAdded from 'app/modules/search/RecentlyAdded';
import { useFocusEffect } from '@react-navigation/native';
import { Stores } from 'app/functions/Stores';

export default observer(() => {
  let { entriesSearchStore, inputSearchStore } = Stores();

  useFocusEffect(
    useCallback(() => {
      inputSearchStore.updateSearchType('entries');
    }, [])
  );

  useEffect(() => {
    entriesSearchStore.getRecentlyAdded();
  });

  if (entriesSearchStore.active) {
    return <SearchEntryList />;
  }
  return <RecentlyAdded />;
});
