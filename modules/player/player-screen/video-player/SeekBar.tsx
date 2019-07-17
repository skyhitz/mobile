import React from 'react';
import { TouchableWithoutFeedback, Slider } from 'react-native';
import { inject } from 'mobx-react';
import { PLAYBACK_STATES } from 'app/modules/player/player-screen/video-player/UiStates';
import Colors from 'app/constants/Colors';
import { Stores } from 'skyhitz-common';

const SeekBar = inject((stores: Stores) => ({
  onSliderLayout: stores.playerStore.onSliderLayout.bind(stores.playerStore),
  onSeekBarTap: stores.playerStore.onSeekBarTap.bind(stores.playerStore),
  onSeekSliderValueChange: stores.playerStore.onSeekSliderValueChange.bind(
    stores.playerStore
  ),
  onSeekSliderSlidingComplete: stores.playerStore.onSeekSliderSlidingComplete.bind(
    stores.playerStore
  ),
  playbackState: stores.playerStore.playbackState,
  seekSliderPosition: stores.playerStore.seekSliderPosition,
}))(
  ({
    onSliderLayout,
    onSeekBarTap,
    onSeekSliderValueChange,
    onSeekSliderSlidingComplete,
    playbackState,
    seekSliderPosition,
  }: any) => (
    <TouchableWithoutFeedback
      onLayout={onSliderLayout.bind(this)}
      onPress={onSeekBarTap.bind(this)}
    >
      <Slider
        style={{ marginRight: 10, marginLeft: 10, flex: 1, borderRadius: 20 }}
        value={seekSliderPosition ? seekSliderPosition : 0}
        onValueChange={onSeekSliderValueChange.bind(this)}
        onSlidingComplete={onSeekSliderSlidingComplete.bind(this)}
        disabled={
          playbackState === PLAYBACK_STATES.LOADING ||
          playbackState === PLAYBACK_STATES.ENDED ||
          playbackState === PLAYBACK_STATES.ERROR
        }
        minimumTrackTintColor={Colors.brandBlue}
        maximumTrackTintColor={Colors.brandBlue}
        thumbTintColor={Colors.brandBlue}
      />
    </TouchableWithoutFeedback>
  )
);

export default SeekBar;