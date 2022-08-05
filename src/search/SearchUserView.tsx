import React, { useCallback } from 'react';
import SearchUserList from 'app/src/search/SearchUserList';
import { useFocusEffect } from '@react-navigation/native';
import { SearchStore } from '../stores/search';

export default () => {
  const { updateSearchType, active } = SearchStore();

  useFocusEffect(
    useCallback(() => {
      updateSearchType('users');
    }, [])
  );

  if (active) {
    return <SearchUserList />;
  }
  return null;
};
