import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import Colors from 'app/constants/Colors';
import cursorPointer from 'app/constants/CursorPointer';

export const KNOB_SIZE = 20;

const styles = StyleSheet.create({
  container: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: 10,
    backgroundColor: Colors.tintColor,
  },
});

export default ({ state }) => {
  return (
    <View style={[styles.container, cursorPointer]}>
      <Animated.View style={[styles.image]}></Animated.View>
    </View>
  );
};
