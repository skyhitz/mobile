import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { inject } from 'mobx-react';
import LikeIcon from 'app/modules/ui/icons/like';
import Colors from 'app/constants/Colors';
import * as stores from 'app/skyhitz-common';
import cursorPointer from 'app/constants/CursorPointer';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  toggleLike: stores.likesStore.toggleLike.bind(stores.likesStore),
  isLiked: stores.likesStore.isLiked,
  entry: stores.playerStore.entry,
}))
export default class LikeBtn extends React.Component<any, any> {
  render() {
    if (!this.props.entry) {
      return null;
    }
    if (this.props.isLiked) {
      return (
        <Pressable
          style={[styles.controlTouch, cursorPointer]}
          onPress={() => this.props.toggleLike(this.props.entry)}
        >
          <LikeIcon size={32} color={Colors.brandBlue} />
        </Pressable>
      );
    }
    return (
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={() => this.props.toggleLike(this.props.entry)}
      >
        <LikeIcon size={32} color={Colors.dividerBackground} />
      </Pressable>
    );
  }
}

var styles = StyleSheet.create({
  controlTouch: {
    width: 32,
    height: 28,
  },
});
