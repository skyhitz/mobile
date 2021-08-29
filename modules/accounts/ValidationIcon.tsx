import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';

const validationIcon = (props) => {
  if (props.isFieldValid) {
    return (
      <MaterialIcons
        name="check-circle"
        size={24}
        color={Colors.valid}
        style={styles.icon}
      />
    );
  }
  if (props.isFieldValid === false) {
    return (
      <FontAwesome
        name="times-circle"
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
    backgroundColor: Colors.transparent,
  },
});

export default validationIcon;
