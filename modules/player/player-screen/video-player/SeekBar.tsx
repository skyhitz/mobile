import React from 'react';
import { observer } from 'mobx-react';
import { PLAYBACK_STATES } from 'app/modules/player/player-screen/video-player/UiStates';
import Colors from 'app/constants/Colors';
import Slider from '../slider/Slider';
import { Stores } from 'app/functions/Stores';

export default observer(() => {
  const { playerStore } = Stores();

  return <Slider />;

  // return (
  //   // <TouchableWithoutFeedback
  //   //   onLayout={evt => playerStore.onSliderLayout(evt)}
  //   //   onPress={evt => playerStore.onSeekBarTap(evt)}
  //   //   style={{
  //   //     zIndex: 15,
  //   //   }}
  //   // >
  //   <Slider
  //     style={{ marginRight: 10, marginLeft: 10, flex: 1 }}
  //     minimumValue={0}
  //     maximumValue={1}
  //     value={playerStore.seekSliderPosition}
  //     onValueChange={value => playerStore.onSeekSliderValueChange(value)}
  //     onSlidingComplete={value =>
  //       playerStore.onSeekSliderSlidingComplete(value)
  //     }
  //     disabled={
  //       playerStore.playbackState === PLAYBACK_STATES.LOADING ||
  //       playerStore.playbackState === PLAYBACK_STATES.ENDED ||
  //       playerStore.playbackState === PLAYBACK_STATES.ERROR
  //     }
  //     minimumTrackTintColor={Colors.brandBlue}
  //     maximumTrackTintColor={Colors.backgroundTrackColor}
  //     thumbTintColor={Colors.brandBlue}
  //   />
  //   // </TouchableWithoutFeedback>
  // );
});
