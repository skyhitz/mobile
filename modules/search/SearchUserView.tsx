import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import SearchUserList from 'app/modules/search/SearchUserList';
import TopRecentUserView from 'app/modules/search/TopRecentUserView';
import { useFocusEffect } from '@react-navigation/native';
import { Stores } from 'app/functions/Stores';

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
