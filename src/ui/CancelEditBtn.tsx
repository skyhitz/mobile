import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Colors from 'app/src/constants/Colors';
import { useLinkTo } from '@react-navigation/native';
import cursorPointer from 'app/src/constants/CursorPointer';

const CancelEditBtn = () => {
  const linkTo = useLinkTo();

  const handleCancel = () => {
    linkTo('/dashboard/profile');
  };

  return (
    <Pressable style={[styles.btn, cursorPointer]} onPress={handleCancel}>
      <Text style={styles.white}>Cancel</Text>
    </Pressable>
  );
};

export default CancelEditBtn;

const styles = StyleSheet.create({
  btn: {
    paddingLeft: 10,
  },
  white: {
    color: Colors.white,
  },
});
