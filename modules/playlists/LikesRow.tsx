import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from 'app/constants/Colors';
import { EvilIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';
import { useNavigation } from '@react-navigation/native';

export default observer(() => {
  let { likesStore, playerStore } = Stores();
  let { navigate } = useNavigation();

  const handleLikesNavigation = () => {
    navigate('LikesScreen');
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
        <TouchableOpacity onPress={handleLikesNavigation}>
          <View style={styles.row}>
            <View style={styles.leftSection}>
              <EvilIcons name={'like'} size={30} color={Colors.brandBlue} />
              <Text style={styles.likesText}>Likes</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.videosText}>{likesCopy()}</Text>
              <EvilIcons
                name={'chevron-right'}
                size={36}
                color={Colors.defaultTextLight}
              />
            </View>
          </View>
        </TouchableOpacity>
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
