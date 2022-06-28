import React from 'react';
import { observer } from 'mobx-react';
import Colors from 'app/src/constants/Colors';
import { Stores } from 'app/src/functions/Stores';
import { Pressable } from 'react-native';
import Slider from '@react-native-community/slider';

export default observer(() => {
  const { playerStore } = Stores();
  return (
    <Pressable
      onPressOut={(evt) => {
        playerStore.onSeekBarTap(evt);
      }}
      onLayout={(evt) => {
        playerStore.onSliderLayout(evt);
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
        value={playerStore.seekPosition}
        onSlidingStart={(_) => {
          playerStore.setSliding(true);
          playerStore.onSeekSliderValueChange();
        }}
        onSlidingComplete={(value) => {
          playerStore.setSliding(false);
          playerStore.onSeekSliderSlidingComplete(value);
        }}
        minimumTrackTintColor={Colors.brandBlue}
        maximumTrackTintColor={Colors.backgroundTrackColor}
        thumbTintColor={Colors.white}
      />
    </Pressable>
  );
});
