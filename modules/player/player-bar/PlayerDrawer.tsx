import { observer } from 'mobx-react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, { call } from 'react-native-reanimated';
import PlayerScreen from '../player-screen/PlayerScreen';
import MiniPlayer from './MiniPlayer';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { clamp, onGestureEvent, timing, withSpring } from 'react-native-redash';
import { Stores } from 'app/functions/Stores';

let tabNavBottom = 89;

const { height } = Dimensions.get('window');
const TABBAR_HEIGHT = getBottomSpace() + 50;
const MINIMIZED_PLAYER_HEIGHT = 42;
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - TABBAR_HEIGHT - MINIMIZED_PLAYER_HEIGHT;
const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};
const {
  Clock,
  Value,
  cond,
  useCode,
  set,
  block,
  not,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated;

const translationY = new Value(0);
const velocityY = new Value(0);
const state = new Value(State.UNDETERMINED);
const offset = new Value(SNAP_BOTTOM);
const clock = new Clock();

export default observer(({ children }) => {
  const { playerStore } = Stores();

  const gestureHandler = onGestureEvent({
    state,
    translationY,
    velocityY,
  });
  const translateY = withSpring({
    value: clamp(translationY, SNAP_TOP, SNAP_BOTTOM),
    velocity: velocityY,
    offset,
    state,
    snapPoints: [SNAP_TOP, SNAP_BOTTOM],
    config,
  });
  const translateBottomTab = interpolate(translateY, {
    inputRange: [SNAP_TOP, SNAP_BOTTOM],
    outputRange: [TABBAR_HEIGHT, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolate(translateY, {
    inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacityInverted = interpolate(translateY, {
    inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity2 = interpolate(translateY, {
    inputRange: [
      SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT * 2,
      SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT,
    ],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(
    () =>
      block([
        cond(playerStore.goUp, [
          set(
            offset,
            timing({
              clock,
              from: offset,
              to: SNAP_TOP,
            })
          ),
          cond(not(clockRunning(clock)), [set(playerStore.goUp, 0)]),
        ]),
        cond(playerStore.goDown, [
          set(
            offset,
            timing({
              clock,
              from: offset,
              to: SNAP_BOTTOM,
            })
          ),
          cond(not(clockRunning(clock)), [set(playerStore.goDown, 0)]),
        ]),
      ]),
    []
  );

  return (
    <>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.playerSheet,
            { opacity: playerStore.entry ? 1 : 0 },
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <Animated.View
            pointerEvents="none"
            style={{
              opacity: opacity2,
              backgroundColor: '#272829',
              ...StyleSheet.absoluteFillObject,
            }}
          />

          <Animated.View
            style={{
              opacity,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: opacity,
            }}
          >
            <MiniPlayer />
          </Animated.View>
          <Animated.View
            style={{
              opacity: opacityInverted,
            }}
          >
            <PlayerScreen />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>

      <Animated.View
        style={{ transform: [{ translateY: translateBottomTab }] }}
      >
        {children}
      </Animated.View>
    </>
  );
});

let styles = StyleSheet.create({
  playerSheet: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  tabPlayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(41, 43, 51, 0.9)',
  },
  entryTitle: {
    fontSize: 12,
    color: 'white',
    paddingLeft: 4,
  },
  tabNav: {
    position: 'absolute',
    bottom: tabNavBottom,
  },
  arrowUp: {
    alignSelf: 'center',
  },
});
