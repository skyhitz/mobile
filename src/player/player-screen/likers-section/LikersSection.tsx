import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LikeBtn from 'app/src/player/player-screen/like-btn/LikeBtn';
import Divider from 'app/src/ui/Divider';
import { UserAvatar } from 'app/src/ui/UserAvatar';
import * as L from 'list';
import { LikesStore } from 'app/src/stores/likes';

export default () => {
  const { entryLikes, hasMoreLikers, plusLikers } = LikesStore();

  const renderMoreLikersBtn = () => {
    return (
      hasMoreLikers() && (
        <View style={styles.plusFriendsCircle}>
          <Text style={styles.plusFriends}>+{plusLikers}</Text>
        </View>
      )
    );
  };

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
        {entryLikes &&
          L.map(
            (liker: any) => (
              <View style={styles.liker} key={liker.id}>
                <UserAvatar user={liker} />
              </View>
            ),
            entryLikes
          )}
        {renderMoreLikersBtn()}
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  bottomSection: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    maxWidth: 650,
    alignSelf: 'center',
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
    marginBottom: 15,
    minHeight: 30,
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
