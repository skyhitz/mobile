import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { observer } from 'mobx-react';
import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';
import { useNavigation } from '@react-navigation/native';
import cursorPointer from 'app/constants/CursorPointer';
import LikeIcon from 'app/modules/ui/icons/like';

export default observer(({ entry }) => {
  const { likesStore } = Stores();
  const { goBack } = useNavigation();

  const handleToggle = async () => {
    await likesStore.toggleLike(entry);
    goBack();
  };
  const isLiked = () => {
    return likesStore.isEntryLiked(entry);
  };
  if (!entry) {
    return null;
  }
  if (isLiked()) {
    return (
      <Pressable onPress={handleToggle}>
        <View style={[styles.field, cursorPointer]}>
          <LikeIcon size={28} color={Colors.brandBlue} />
          <Text style={styles.textLiked}>Like</Text>
        </View>
      </Pressable>
    );
  }
  return (
    <Pressable onPress={handleToggle}>
      <View style={[styles.field, cursorPointer]}>
        <LikeIcon size={28} color={Colors.dividerBackground} />
        <Text style={styles.text}>Like</Text>
      </View>
    </Pressable>
  );
});

var styles = StyleSheet.create({
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 50,
    height: 40,
    marginBottom: 10,
    width: '100%',
  },
  text: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.white,
    paddingLeft: 10,
  },
  textLiked: {
    fontSize: 14,
    textAlign: 'left',
    paddingLeft: 10,
    color: Colors.brandBlue,
  },
});
