import React from 'react';
import { ScrollView } from 'react-native';
import UserRow from 'app/src/ui/UserRow';
import SearchingLoader from 'app/src/ui/SearchingLoader';
import Colors from 'app/src/constants/Colors';
import BottomPlaceholder from 'app/src/ui/BottomPlaceholder';
import ResponsiveLayout from '../ui/ResponsiveLayout';
import { SearchStore } from '../stores/search';

const UserSearchList = () => {
  const { users, searching, query } = SearchStore();

  return (
    <ScrollView style={{ backgroundColor: Colors.listItemBackground, flex: 1 }}>
      <ResponsiveLayout>
        {SearchingLoader(searching, query)}
        {users.map((user) => (
          <UserRow user={user} key={user.id} />
        ))}
        <BottomPlaceholder />
      </ResponsiveLayout>
    </ScrollView>
  );
};

export default UserSearchList;
