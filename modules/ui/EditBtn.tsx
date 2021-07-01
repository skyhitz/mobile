import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import { useLinkTo } from '@react-navigation/native';
import cursorPointer from 'app/constants/CursorPointer';

export default () => {
  const linkTo = useLinkTo();

  const handleOnPress = () => {
    linkTo('/edit-profile');
  };
  return (
    <Pressable style={[styles.btn, cursorPointer]} onPress={handleOnPress}>
      <Text style={styles.white}>Edit</Text>
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
