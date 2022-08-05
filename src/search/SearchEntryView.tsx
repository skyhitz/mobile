import React, { useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import SearchEntryList from 'app/src/search/SearchEntryList';
import RecentlyAdded from 'app/src/search/RecentlyAdded';
import { useFocusEffect } from '@react-navigation/native';
import { SearchStore, activeSearchAtom } from '../stores/search';

export default () => {
  const { getRecentlyAdded, updateSearchType } = SearchStore();
  const active = useRecoilValue(activeSearchAtom);

  useFocusEffect(
    useCallback(() => {
      updateSearchType('entries');
    }, [])
  );

  const handleRecentlyAdded = async () => {
    await getRecentlyAdded();
  };

  useEffect(() => {
    handleRecentlyAdded();
  }, []);

  if (active) {
    return <SearchEntryList />;
  }
  return <RecentlyAdded />;
};
