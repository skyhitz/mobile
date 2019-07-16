import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { navigate } from 'app/modules/navigation/Navigator';
import Colors from 'app/constants/Colors';

export default class EditBtn extends React.Component<any, any> {
  async openProfileModal() {
    navigate('EditProfileModal');
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={this.openProfileModal.bind(this)}
      >
        <Text style={styles.white}>Edit</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingRight: 10,
  },
  white: {
    color: Colors.white,
  },
});
