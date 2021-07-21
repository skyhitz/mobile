import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import PlayerScreen from '../player-screen/PlayerScreen';
import MiniPlayer from './MiniPlayer';
import { State } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { clamp, timing, withSpring } from 'react-native-redash/lib/module/v1';
import { Stores } from 'app/functions/Stores';
import Colors from 'app/constants/Colors';
import { useEffect } from 'react';

let tabNavBottom = 89;

const {
  Clock,
  Value,
  cond,
  useCode,
  set,
  block,
  not,
  clockRunning,
  interpolateNode,
  Extrapolate,
} = Animated;

const { height } = Dimensions.get('window');
const TABBAR_HEIGHT = getBottomSpace() + 50;

let MINIMIZED_PLAYER_HEIGHT = 42;

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
const translationY = new Value(0);
const velocityY = new Value(0);
const goUp = new Value(0);
const goDown = new Value(0);
const state = new Value(State.UNDETERMINED);
const offset = new Value(SNAP_BOTTOM);
const clock = new Clock();

export default observer(({ children }) => {
  const { playerStore } = Stores();

  const translateY = withSpring({
    value: clamp(translationY, SNAP_TOP, SNAP_BOTTOM),
    velocity: velocityY,
    offset,
    state,
    snapPoints: [SNAP_TOP, SNAP_BOTTOM],
    config,
  });
  const translateBottomTab = interpolateNode(translateY, {
    inputRange: [SNAP_TOP, SNAP_BOTTOM],
    outputRange: [TABBAR_HEIGHT, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolateNode(translateY, {
    inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacityInverted = interpolateNode(translateY, {
    inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity2 = interpolateNode(translateY, {
    inputRange: [
      SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT * 2,
      SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT,
    ],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  useEffect(() => {
    if (playerStore.show) {
      goUp.setValue(1 as any);
    } else {
      goDown.setValue(1 as any);
    }
  }, [playerStore.show]);

  useCode(
    () =>
      block([
        cond(goUp, [
          set(
            offset,
            timing({
              clock,
              from: offset,
              to: SNAP_TOP,
            })
          ),
          cond(not(clockRunning(clock)), [set(goUp, 0)]),
        ]),
        cond(goDown, [
          set(
            offset,
            timing({
              clock,
              from: offset,
              to: SNAP_BOTTOM,
            })
          ),
          cond(not(clockRunning(clock)), [set(goDown, 0)]),
        ]),
      ]),
    []
  );

  return (
    <>
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
            flex: 1,
          }}
        >
          <PlayerScreen />
        </Animated.View>
      </Animated.View>

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
    backgroundColor: Colors.darkBlue,
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
