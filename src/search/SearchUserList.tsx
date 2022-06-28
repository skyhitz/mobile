import React from 'react';
import { ScrollView } from 'react-native';
import { inject } from 'mobx-react';
import UserRow from 'app/src/ui/UserRow';
import SearchingLoader from 'app/src/ui/SearchingLoader';
import Colors from 'app/src/constants/Colors';
import BottomPlaceholder from 'app/src/ui/BottomPlaceholder';
import * as stores from 'app/src/stores';
import * as L from 'list';
import ResponsiveLayout from '../ui/ResponsiveLayout';
type Stores = typeof stores;

const UserSearchList = inject((stores: Stores) => ({
  users: stores.usersSearchStore.users,
  searching: stores.usersSearchStore.searching,
  query: stores.usersSearchStore.query,
}))(({ users, searching, query }: any) => (
  <ScrollView style={{ backgroundColor: Colors.listItemBackground, flex: 1 }}>
    <ResponsiveLayout>
      {SearchingLoader(searching, query)}
      {L.map(
        (user: { id: string | number | undefined }) => (
          <UserRow user={user} key={user.id} />
        ),
        users
      )}
      <BottomPlaceholder />
    </ResponsiveLayout>
  </ScrollView>
));

export default UserSearchList;
