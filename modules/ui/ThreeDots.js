import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Colors from 'app/constants/Colors';

var styles = StyleSheet.create({
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.threeDotsDark,
    marginLeft: 2,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
});

export default class ThreeDots extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </TouchableOpacity>
    );
  }
}
