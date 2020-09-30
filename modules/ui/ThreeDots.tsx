import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Colors from 'app/constants/Colors';
import cursorPointer from 'app/constants/CursorPointer';

var styles = StyleSheet.create({
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginLeft: 5,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
});

export default class ThreeDots extends React.Component<any, any> {
  render() {
    return (
      <Pressable onPress={this.props.onPress}>
        <View style={[styles.dots, cursorPointer]}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </Pressable>
    );
  }
}
