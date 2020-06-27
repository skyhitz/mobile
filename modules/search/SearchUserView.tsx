import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import SearchUserList from 'app/modules/search/SearchUserList';
import TopRecentUserView from 'app/modules/search/TopRecentUserView';
import { useIsFocused } from '@react-navigation/native';
import { Stores } from 'app/functions/Stores';

export default observer(() => {
  const isFocused = useIsFocused();
  let { usersSearchStore, inputSearchStore } = Stores();

  useEffect(() => {
    if (isFocused) {
      inputSearchStore.updateSearchType('users');
    }
  }, []);

  if (usersSearchStore.active) {
    return <SearchUserList />;
  }
  return <TopRecentUserView />;
});
