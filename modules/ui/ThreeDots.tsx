import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Colors from 'app/constants/Colors';
import cursorPointer from 'app/constants/CursorPointer';

var styles = StyleSheet.create({
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: Colors.white,
    marginVertical: 2,
  },
  dots: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
