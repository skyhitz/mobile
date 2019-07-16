import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';

const validationIcon = isFieldValid => {
  if (isFieldValid) {
    return (
      <Ionicons
        name="ios-checkmark-circle-outline"
        size={24}
        color={Colors.valid}
        style={styles.icon}
      />
    );
  }
  if (isFieldValid === false) {
    return (
      <Ionicons
        name="ios-close-circle-outline"
        size={24}
        color={Colors.errorBackground}
        style={styles.icon}
      />
    );
  }
  return null;
};

let styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    bottom: 8,
    right: 0,
    backgroundColor: Colors.transparent,
  },
});

export default validationIcon;
