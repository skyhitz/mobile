import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { goBack } from 'app/modules/navigation/Navigator';
import Colors from 'app/constants/Colors';

export default class CancelEditBtn extends React.Component {
  async closeProfileModal() {
    goBack();
  }
  render() {
    return (
      <TouchableOpacity
        rejectResponderTermination
        style={styles.btn}
        onPress={this.closeProfileModal.bind(this)}
      >
        <Text style={styles.white}>Cancel</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingLeft: 10,
  },
  white: {
    color: Colors.white,
  },
});
