import React from 'react';
import Colors from 'app/src/constants/Colors';
import { Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { PlayerStore } from 'app/src/stores/player';

export default () => {
  const {
    onSeekBarTap,
    onSliderLayout,
    seekPosition,
    setSliding,
    onSeekSliderValueChange,
    onSeekSliderSlidingComplete,
  } = PlayerStore();
  return (
    <Pressable
      onPressOut={(evt) => {
        onSeekBarTap(evt);
      }}
      onLayout={(evt) => {
        onSliderLayout(evt);
      }}
      style={{
        zIndex: 15,
        flex: 1,
      }}
    >
      <Slider
        style={{ flex: 1 }}
        minimumValue={0}
        maximumValue={1}
        value={seekPosition}
        onSlidingStart={(_) => {
          setSliding(true);
          onSeekSliderValueChange();
        }}
        onSlidingComplete={(value) => {
          setSliding(false);
          onSeekSliderSlidingComplete(value);
        }}
        minimumTrackTintColor={Colors.brandBlue}
        maximumTrackTintColor={Colors.backgroundTrackColor}
        thumbTintColor={Colors.white}
      />
    </Pressable>
  );
};
