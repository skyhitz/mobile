import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from 'app/constants/Colors';
import { useLinkTo } from '@react-navigation/native';
import cursorPointer from 'app/constants/CursorPointer';
import EditIcon from 'app/modules/ui/icons/edit';

export default () => {
  const linkTo = useLinkTo();

  const handleOnPress = () => {
    linkTo('/edit-profile');
  };
  return (
    <Pressable style={[styles.btn, cursorPointer]} onPress={handleOnPress}>
      <EditIcon size={18} color={Colors.defaultTextLight} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingRight: 10,
  },
  white: {
    color: Colors.white,
  },
});
