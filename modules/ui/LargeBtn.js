import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';

export default class LargeBtn extends React.Component {
  render() {
    return (
      <TouchableOpacity
        rejectResponderTermination
        style={styles.btn}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <Text style={styles.white}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.brandBlue,
    width: 220,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
