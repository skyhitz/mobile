import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import { useNavigation } from '@react-navigation/native';

const EditBtn = () => {
  const { navigate } = useNavigation();

  const handleOnPress = () => {
    navigate('EditProfileModal');
  };
  return (
    <TouchableOpacity style={styles.btn} onPress={handleOnPress}>
      <Text style={styles.white}>Edit</Text>
    </TouchableOpacity>
  );
};

export default EditBtn;

const styles = StyleSheet.create({
  btn: {
    paddingRight: 10,
  },
  white: {
    color: Colors.white,
  },
});
