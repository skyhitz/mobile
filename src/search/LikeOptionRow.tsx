import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { observer } from 'mobx-react';
import Colors from 'app/src/constants/Colors';
import { Stores } from 'app/src/functions/Stores';
import { useNavigation } from '@react-navigation/native';
import cursorPointer from 'app/src/constants/CursorPointer';
import LikeIcon from 'app/src/ui/icons/like';

export default observer(({ entry, iconOnly = false, size = 24 }) => {
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
        <View
          style={[
            iconOnly ? styles.iconOnlyfield : styles.field,
            cursorPointer,
          ]}
        >
          <LikeIcon fill={true} size={size} color={Colors.brandBlue} />
          {!iconOnly && <Text style={styles.textLiked}>Unlike</Text>}
        </View>
      </Pressable>
    );
  }
  return (
    <Pressable onPress={handleToggle}>
      <View
        style={[iconOnly ? styles.iconOnlyfield : styles.field, cursorPointer]}
      >
        <LikeIcon size={size} color={Colors.dividerBackground} />
        {!iconOnly && <Text style={styles.text}>Like</Text>}
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
  iconOnlyfield: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
