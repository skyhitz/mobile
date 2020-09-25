import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import { useNavigation } from '@react-navigation/native';

const CancelEditBtn = () => {
  const { goBack } = useNavigation();
  return (
    <Pressable style={styles.btn} onPress={goBack}>
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
