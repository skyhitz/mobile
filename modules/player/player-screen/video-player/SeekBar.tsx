import React from 'react';
import { Slider, TouchableWithoutFeedback } from 'react-native';
import { inject } from 'mobx-react';
import { PLAYBACK_STATES } from 'app/modules/player/player-screen/video-player/UiStates';
import Colors from 'app/constants/Colors';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
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
}))
export default class SeekBar extends React.Component<any, any> {
  render() {
    return <TouchableWithoutFeedback
      onLayout={(evt) => this.props.onSliderLayout(evt)}
      onPress={(evt) => this.props.onSeekBarTap(evt)}
    >
      <Slider
        style={{ marginRight: 10, marginLeft: 10, flex: 1 }}
        value={this.props.seekSliderPosition ? this.props.seekSliderPosition : 0}
        onValueChange={(value) => this.props.onSeekSliderValueChange(value)}
        onSlidingComplete={(value) => this.props.onSeekSliderSlidingComplete(value)}
        disabled={
          this.props.playbackState === PLAYBACK_STATES.LOADING ||
          this.props.playbackState === PLAYBACK_STATES.ENDED ||
          this.props.playbackState === PLAYBACK_STATES.ERROR
        }
        minimumTrackTintColor={Colors.brandBlue}
        maximumTrackTintColor={Colors.backgroundTrackColor}
        thumbTintColor={Colors.brandBlue}
      />
    </TouchableWithoutFeedback>
  }
}
