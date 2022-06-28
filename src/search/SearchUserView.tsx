import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import SearchUserList from 'app/src/search/SearchUserList';
import TopRecentUserView from 'app/src/search/TopRecentUserView';
import { useFocusEffect } from '@react-navigation/native';
import { Stores } from 'app/src/functions/Stores';

export default observer(() => {
  let { usersSearchStore, inputSearchStore } = Stores();

  useFocusEffect(
    useCallback(() => {
      inputSearchStore.updateSearchType('users');
    }, [])
  );

  if (usersSearchStore.active) {
    return <SearchUserList />;
  }
  return <TopRecentUserView />;
});
