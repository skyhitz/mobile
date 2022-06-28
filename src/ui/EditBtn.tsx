import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from 'app/src/constants/Colors';
import { useLinkTo } from '@react-navigation/native';
import cursorPointer from 'app/src/constants/CursorPointer';
import CogIcon from 'app/src/ui/icons/cog';

export default ({ customStyles }) => {
  const linkTo = useLinkTo();

  const handleOnPress = () => {
    linkTo('/edit-profile');
  };
  return (
    <Pressable
      style={[styles.btn, cursorPointer, customStyles]}
      onPress={handleOnPress}
    >
      <CogIcon size={18} color={Colors.defaultTextLight} />
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
