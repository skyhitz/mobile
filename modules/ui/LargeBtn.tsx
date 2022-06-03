import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import cursorPointer from 'app/constants/CursorPointer';
import tw from 'twin.macro';

export default class LargeBtn extends React.Component<any, any> {
  getStyles() {
    if (this.props.secondary) {
      return styles.backgroundBtn;
    }
    return this.props.disabled ? styles.btnDisabled : styles.btn;
  }
  render() {
    return (
      <Pressable
        style={[this.getStyles(), cursorPointer]}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <Text style={tw`px-2 text-white font-medium`}>{this.props.text}</Text>
        {this.props.icon ? this.props.icon() : null}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  backgroundBtn: {
    backgroundColor: Colors.grey,
    width: 220,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.brandBlue,
    width: 220,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnDisabled: {
    backgroundColor: Colors.brandBlue,
    width: 220,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
});
