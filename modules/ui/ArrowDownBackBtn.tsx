import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => goBack()}
      style={styles.arrowDownTouchableArea}
    >
      <EvilIcons
        name={'chevron-down'}
        size={36}
        color={Colors.white}
        style={styles.arrowDown}
      />
    </TouchableOpacity>
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
