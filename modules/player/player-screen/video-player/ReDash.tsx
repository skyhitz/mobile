import * as React from 'react';
import { TextInput, TextStyle } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface TextProps {
  text: Animated.Node<string>;
  style?: TextStyle;
}

export const ReText = (props: TextProps) => {
  const { text, style } = { style: {}, ...props };
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      {...{ text, style }}
    />
  );
};

type TimingConfig = Partial<Omit<Animated.TimingConfig, 'toValue'>>;

const {
  Value,
  cond,
  eq,
  block,
  set,
  Clock,
  spring,
  startClock,
  timing,
  neq,
  useCode,
  SpringUtils,
} = Animated;

export const withTransition = (
  value: Animated.Node<number>,
  timingConfig: TimingConfig = {},
  gestureState: Animated.Value<State> = new Value(State.UNDETERMINED)
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    duration: 250,
    easing: Easing.linear,
    ...timingConfig,
  };
  return block([
    startClock(clock),
    cond(neq(config.toValue, value), [
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.finished, 0),
      set(config.toValue, value),
    ]),
    cond(
      eq(gestureState, State.ACTIVE),
      [set(state.position, value)],
      timing(clock, state, config)
    ),
    state.position,
  ]);
};
