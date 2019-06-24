import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react';
import Divider from 'app/modules/ui/Divider';
import Colors from 'app/constants/Colors';
import { navigate } from 'app/modules/navigation/Navigator';
import { UserAvatar } from 'app/modules/ui/UserAvatar';
import { trackOpenProfile } from 'app/analytics/Tracking';
import { Stores } from 'skyhitz-common';

@inject((stores:Stores) => ({
  getProfileInfo: stores.profileStore.getProfileInfo.bind(stores.profileStore),
  addRecentUserSearch: stores.usersSearchStore.addRecentUserSearch.bind(
    stores.usersSearchStore
  ),
  setPlaylistMode: stores.playerStore.setPlaylistMode.bind(stores.playerStore),
}))
export default class UserRow extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.rowWrap}>
        <View style={styles.rowWrap}>
          <TouchableOpacity
            onPress={() => {
              this.props.getProfileInfo(this.props.user).then(entries => {
                this.props.setPlaylistMode(entries);
              });
              navigate('UserProfile', {
                username: this.props.user.username,
              });
              trackOpenProfile(this.props.user);
              if (this.props.recentSearch) {
                this.props.addRecentUserSearch(this.props.user.id);
              }
            }}
          >
            <View style={styles.row}>
              {UserAvatar(this.props.user)}
              <View>
                <Text style={styles.username}>{this.props.user.username}</Text>
                <Text style={styles.displayName}>
                  {this.props.user.displayName}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Divider />
      </View>
    );
  }
}

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
    paddingLeft: 10,
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
