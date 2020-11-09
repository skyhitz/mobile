import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ReText, withTransition } from './ReDash';
import Animated, { Value, concat, multiply } from 'react-native-reanimated';

export default ({ playback }) => {
  const progress = new Value<number>(0);
  const position = new Value<string>('00:00');
  const total = new Value<string>('00:00');
  const transition = withTransition(progress);

  return (
    <View style={styles.container}>
      <ReText style={styles.label} text={position} />
      <View style={styles.bar}>
        <View style={styles.gradient} />
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: concat(multiply(transition, 100), '%'),
          }}
        >
          <View style={styles.gradient} />
        </Animated.View>
      </View>
      <ReText style={styles.label} text={total} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  bar: {
    marginVertical: 16,
    flex: 1,
    height: 16,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  label: {
    marginHorizontal: 8,
    fontFamily: 'Chicago',
    width: 45,
    fontSize: 12,
    textAlign: 'center',
  },
});
