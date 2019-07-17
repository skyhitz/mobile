import React from 'react';
import { ScrollView } from 'react-native';
import { inject } from 'mobx-react';
import UserRow from 'app/modules/ui/UserRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import { Stores } from 'skyhitz-common';

const UserSearchList = inject((stores:Stores) => ({
  users: stores.usersSearchStore.users,
  searching: stores.usersSearchStore.searching,
  query: stores.usersSearchStore.query,
}))(({ users, searching, query }:any) => (
  <ScrollView style={{ backgroundColor: Colors.listItemBackground, flex: 1 }}>
    {SearchingLoader(searching, query)}
    {users.map(user => (
      <UserRow user={user} recentSearch={true} key={user.id} />
    ))}
    <BottomPlaceholder />
  </ScrollView>
));

export default UserSearchList;