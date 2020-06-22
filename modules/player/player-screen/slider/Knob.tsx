import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import { State, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Colors from 'app/constants/Colors';

interface KnobProps {
  state: Animated.Node<State>;
}

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

export default ({ state }: KnobProps) => {
  return (
    <View
      style={[
        styles.container,
        Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : {},
      ]}
    >
      <Animated.View style={[styles.image]}></Animated.View>
    </View>
  );
};
