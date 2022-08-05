import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from 'app/src/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import cursorPointer from 'app/src/constants/CursorPointer';
import ChevronDownIcon from 'app/src/ui/icons/chevron-down';

export default () => {
  const { goBack } = useNavigation();
  return (
    <Pressable
      onPress={() => goBack()}
      style={[styles.arrowDownTouchableArea, cursorPointer]}
    >
      <ChevronDownIcon size={36} color={Colors.white} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  white: {
    color: Colors.white,
  },
  arrowDownTouchableArea: {
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 2,
    width: 60,
    alignSelf: 'center',
  },
  arrowDown: {
    alignSelf: 'center',
  },
});
