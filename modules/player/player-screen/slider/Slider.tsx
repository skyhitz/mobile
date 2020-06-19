import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  call,
  cond,
  diffClamp,
  divide,
  eq,
  sub,
  useCode,
  block,
  not,
  add,
  set,
} from 'react-native-reanimated';
import { withOffset, onGestureEvent } from 'react-native-redash';

import Knob, { KNOB_SIZE } from './Knob';
import Colors from 'app/constants/Colors';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';

const RULER_HEIGHT = 4;

export default observer(() => {
  const { playerStore } = Stores();
  const gestureHandler = onGestureEvent({
    state: playerStore.sliderState,
    translationX: playerStore.translationX,
  });

  const transX = diffClamp(
    cond(
      eq(playerStore.sliderState, State.ACTIVE),
      add(playerStore.offsetX, playerStore.translationX),
      set(
        playerStore.offsetX,
        add(playerStore.offsetX, playerStore.translationX)
      )
    ),
    0,
    playerStore.sliderWidth
  );
  const translateX = sub(transX, KNOB_SIZE / 2);
  const value = divide(transX, playerStore.sliderWidth);

  useCode(
    () =>
      block([
        cond(
          eq(playerStore.sliderState, State.END),
          call([value], ([v]) => {
            console.log('on sliding complete', v);
            playerStore.onSeekSliderSlidingComplete(v);
            playerStore.sliderState.setValue(0);
          })
        ),
        cond(
          eq(playerStore.sliderState, State.BEGAN),
          call([value], () => {
            playerStore.onSeekSliderValueChange();
          })
        ),
      ]),
    [playerStore.sliderState, value]
  );

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <TouchableWithoutFeedback
          onLayout={evt => playerStore.onSliderLayout(evt)}
          onPress={evt => {
            playerStore.translationX.setValue(evt.nativeEvent.locationX);
            playerStore.offsetX.setValue(0);
            playerStore.onSeekBarTap(evt);
          }}
          style={{
            zIndex: 15,
          }}
        >
          <View>
            <View style={styles.backgroundSlider} />
            <View style={styles.sides}>
              <View style={styles.left} />
              <View style={styles.right} />
            </View>
            <Animated.View
              style={[
                styles.backgroundSlider,
                {
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: Colors.darkBlueTransparent,
                },
              ]}
            />
          </View>
        </TouchableWithoutFeedback>
        <PanGestureHandler minDist={0} {...gestureHandler}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: KNOB_SIZE,
              height: KNOB_SIZE,
              transform: [{ translateX }],
            }}
          >
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
              }}
            >
              <Knob state={playerStore.sliderState} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: KNOB_SIZE,
    justifyContent: 'center',
  },
  backgroundSlider: {
    height: RULER_HEIGHT,
  },
  sides: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    height: RULER_HEIGHT,
    width: RULER_HEIGHT,
    borderRadius: RULER_HEIGHT / 2,
    backgroundColor: Colors.darkBlueTransparent,
    left: -RULER_HEIGHT / 2,
  },
  right: {
    left: RULER_HEIGHT / 2,
    height: RULER_HEIGHT,
    width: RULER_HEIGHT,
    borderRadius: RULER_HEIGHT / 2,
    backgroundColor: Colors.darkBlueTransparent,
  },
});
