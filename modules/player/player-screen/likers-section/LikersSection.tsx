import React from 'react';
import { inject } from 'mobx-react';
import { StyleSheet, View, Text } from 'react-native';
import LikeBtn from 'app/modules/player/player-screen/like-btn/LikeBtn';
import Divider from 'app/modules/ui/Divider';
import Layout from 'app/constants/Layout';
import { UserAvatar } from 'app/modules/ui/UserAvatar';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  likers: stores.likesStore.entryLikes,
  hasMoreLikers: stores.likesStore.hasMoreLikers,
  plusLikers: stores.likesStore.plusLikers,
}))
export default class LikersSection extends React.Component<any, any> {
  renderLikers() {
    if (!this.props.likers) {
      return null;
    }
    return this.props.likers.map(
      (liker: any, i: string | number | undefined) => (
        <View style={styles.liker} key={i}>
          <UserAvatar user={liker} />
        </View>
      )
    );
  }

  renderMoreLikersBtn() {
    if (!this.props.hasMoreLikers) {
      return null;
    }
    return (
      <View style={styles.plusFriendsCircle}>
        <Text style={styles.plusFriends}>+{this.props.plusLikers}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.bottomSection}>
        <View style={styles.likedByWrap}>
          <Text style={styles.likedByText}>Liked By</Text>
          <View style={styles.actionsWrap}>
            <LikeBtn />
          </View>
        </View>
        <Divider />
        <View style={styles.likers}>
          {this.renderLikers()}
          {this.renderMoreLikersBtn()}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  bottomSection: {
    height: 110,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  likedByWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likedByText: {
    height: 30,
    lineHeight: 30,
    fontSize: 14,
    color: 'white',
    textAlign: 'left',
    width: 100,
  },
  likers: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    marginTop: 10,
  },
  liker: {
    marginRight: 7,
  },
  profilepic: {
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  plusFriendsCircle: {
    borderRadius: 15,
    width: 30,
    height: 30,
    backgroundColor: '#9a9999',
  },
  plusFriends: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    paddingTop: 8,
  },
});
