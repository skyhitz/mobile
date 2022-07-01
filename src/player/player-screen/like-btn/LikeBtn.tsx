import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import LikeIcon from 'app/src/ui/icons/like';
import Colors from 'app/src/constants/Colors';
import cursorPointer from 'app/src/constants/CursorPointer';
import { LikesStore } from 'app/src/stores/likes';

export default (props) => {
  const { toggleLike, isLiked } = LikesStore();
  // const { entry } = PlayerStore();
  const entry = null;

  if (!entry) {
    return null;
  }
  if (isLiked()) {
    return (
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={() => toggleLike(entry)}
      >
        <LikeIcon size={32} color={Colors.brandBlue} />
      </Pressable>
    );
  }
  return (
    <Pressable
      style={[styles.controlTouch, cursorPointer]}
      onPress={() => toggleLike(entry)}
    >
      <LikeIcon size={32} color={Colors.dividerBackground} />
    </Pressable>
  );
};

var styles = StyleSheet.create({
  controlTouch: {
    width: 32,
    height: 28,
  },
});
