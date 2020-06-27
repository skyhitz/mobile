import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import SearchEntryList from 'app/modules/search/SearchEntryList';
import RecentlyAdded from 'app/modules/search/RecentlyAdded';
import { useIsFocused } from '@react-navigation/native';
import { Stores } from 'app/functions/Stores';

export default observer(() => {
  const isFocused = useIsFocused();
  let { entriesSearchStore, inputSearchStore } = Stores();

  useEffect(() => {
    if (isFocused) {
      inputSearchStore.updateSearchType('entries');
    }
  }, []);

  if (entriesSearchStore.active) {
    return <SearchEntryList />;
  }
  return <RecentlyAdded />;
});
