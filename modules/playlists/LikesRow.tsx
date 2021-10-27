import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from 'app/constants/Colors';
import LikeIcon from 'app/modules/ui/icons/like';
import ChevronRight from 'app/modules/ui/icons/chevron-right';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';
import { useLinkTo } from '@react-navigation/native';
import cursorPointer from 'app/constants/CursorPointer';

export default observer(() => {
  let { likesStore, playerStore } = Stores();
  let linkTo = useLinkTo();

  const handleLikesNavigation = () => {
    linkTo('/dashboard/profile/likes');
    playerStore.setPlaylistMode(likesStore.userLikes);
  };

  const likesCopy = () => {
    if (!likesStore.userLikesCount) {
      return null;
    }
    if (likesStore.userLikesCount === 1) {
      return '1 Video';
    }
    return `${likesStore.userLikesCount} Videos`;
  };
  return (
    <View style={styles.rowWrap}>
      <View style={styles.rowWrap}>
        <Pressable style={cursorPointer} onPress={handleLikesNavigation}>
          <View style={styles.row}>
            <View style={styles.leftSection}>
              <LikeIcon size={30} color={Colors.brandBlue} />
              <Text style={styles.likesText}>Likes</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.videosText}>{likesCopy()}</Text>
              <ChevronRight size={36} color={Colors.defaultTextLight} />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
});

let styles = StyleSheet.create({
  rowWrap: {
    flex: 1,
    backgroundColor: Colors.listItemBackground,
    maxHeight: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingTop: 9,
    paddingBottom: 6,
    paddingLeft: 20,
    paddingRight: 5,
    backgroundColor: Colors.listItemBackground,
  },
  leftSection: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  rightSection: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  likesText: {
    fontWeight: 'bold',
    color: Colors.defaultTextDark,
    paddingLeft: 10,
  },
  videosText: {
    color: Colors.defaultTextDark,
    paddingLeft: 5,
  },
});
