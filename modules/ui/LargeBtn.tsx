import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import { Feather } from '@expo/vector-icons';

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
        style={this.getStyles()}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <Text style={styles.white}>{this.props.text}</Text>
        {this.props.iconName ? (
          <Feather
            name={this.props.iconName}
            style={{ paddingLeft: 12 }}
            size={24}
            color="white"
          />
        ) : null}
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
  white: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
