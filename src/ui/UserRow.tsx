import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from 'app/src/constants/Colors';
import { UserAvatar } from 'app/src/ui/UserAvatar';
import { CommonActions, useNavigation } from '@react-navigation/native';
import ProfileStore from '../stores/profile';
import { PlayerStore } from '../stores/player';

export default ({ user }) => {
  const { handleSetPlaylistMode } = PlayerStore();
  const { getProfileInfo } = ProfileStore();
  const { dispatch } = useNavigation();
  return (
    <View style={styles.rowWrap}>
      <View style={styles.rowWrap}>
        <Pressable
          onPress={() => {
            getProfileInfo(user).then((entries: any) => {
              handleSetPlaylistMode(entries);
            });
            dispatch(
              CommonActions.navigate({
                name: 'UserProfile',
                params: {
                  username: user.username,
                },
              })
            );
          }}
        >
          <View style={styles.row}>
            <UserAvatar user={user} />
            <View>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.displayName}>{user.displayName}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  rowWrap: {
    flex: 1,
    backgroundColor: Colors.listItemBackground,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 20,
    backgroundColor: Colors.listItemBackground,
  },
  username: {
    fontSize: 12,
    textAlign: 'left',
    fontWeight: 'bold',
    paddingLeft: 10,
    marginTop: 2,
    color: Colors.defaultTextDark,
  },
  displayName: {
    fontSize: 12,
    textAlign: 'left',
    paddingLeft: 10,
    marginBottom: 2,
    marginTop: 1,
    color: Colors.defaultTextLight,
  },
});
