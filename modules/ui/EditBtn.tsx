import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from 'app/constants/Colors';
import { useLinkTo } from '@react-navigation/native';
import cursorPointer from 'app/constants/CursorPointer';
import { Feather } from '@expo/vector-icons';

export default () => {
  const linkTo = useLinkTo();

  const handleOnPress = () => {
    linkTo('/edit-profile');
  };
  return (
    <Pressable style={[styles.btn, cursorPointer]} onPress={handleOnPress}>
      <Feather name={'edit'} size={16} color={Colors.defaultTextLight} />
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
