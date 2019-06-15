import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Divider from 'app/modules/ui/Divider';
import Colors from 'app/constants/Colors';
import { navigate } from 'app/modules/navigation/Navigator';
import { UserAvatar } from 'app/modules/ui/UserAvatar';
import { trackOpenProfile } from 'app/analytics/Tracking';
import { EvilIcons } from '@expo/vector-icons';
import { inject } from 'mobx-react/native';

@inject(stores => ({
  count: stores.likesStore.userLikesCount,
  likes: stores.likesStore.userLikes,
  setPlaylistMode: stores.playerStore.setPlaylistMode.bind(stores.playerStore),
}))
export default class LikesRow extends React.Component<any, any> {
  likesCopy() {
    if (!this.props.count) {
      return null;
    }
    if (this.props.count === 1) {
      return '1 Video';
    }
    return `${this.props.count} Videos`;
  }
  handleLikesNavigation() {
    navigate('LikesScreen');
    this.props.setPlaylistMode(this.props.likes);
  }
  render() {
    return (
      <View style={styles.rowWrap}>
        <View style={styles.rowWrap}>
          <TouchableOpacity onPress={this.handleLikesNavigation.bind(this)}>
            <View style={styles.row}>
              <View style={styles.leftSection}>
                <EvilIcons name={'like'} size={32} color={Colors.brandBlue} />
                <Text style={styles.likesText}>Likes</Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.videosText}>{this.likesCopy()}</Text>
                <EvilIcons
                  name={'chevron-right'}
                  size={36}
                  color={Colors.defaultTextLight}
                />
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
    maxHeight: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingTop: 9,
    paddingBottom: 6,
    paddingLeft: 10,
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
    paddingLeft: 5,
  },
  videosText: {
    color: Colors.defaultTextDark,
    paddingLeft: 5,
  },
});
