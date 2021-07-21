import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  CurrentTimeDisplay,
  DurationDisplay,
} from 'app/modules/player/player-screen/video-player/VideoTimeDisplay';
import { videoWidth } from 'app/modules/player/player-screen/video-player/VideoConstants';
import FullscreenControl from 'app/modules/player/player-screen/video-player/FullscreenControl';
import PlayPauseInvisibleArea from 'app/modules/player/player-screen/video-player/PlayPauseInvisibleArea';
import VideoErrorText from 'app/modules/player/player-screen/video-player/VideoErrorText';
import Slider from '../slider/Slider';
import VideoComponent from './VideoComponent';

const BottomBar = () => {
  return (
    <View style={styles.bottomBar}>
      <CurrentTimeDisplay />
      <Slider />
      <DurationDisplay />
      <FullscreenControl />
    </View>
  );
};

export default () => {
  let [dynamicHeight, setDynamicHeight] = useState(0);

  const onLayout = ({ nativeEvent }) => {
    let { layout } = nativeEvent;
    let { width } = layout;
    setDynamicHeight(width * (9 / 16));
  };

  return (
    <View style={styles.container}>
      <View style={styles.container} onLayout={onLayout}>
        <VideoComponent dynamicHeight={dynamicHeight} />
        <PlayPauseInvisibleArea />
        <VideoErrorText />
      </View>
      <BottomBar />
    </View>
  );
};

let styles = StyleSheet.create({
  bottomBar: {
    bottom: 0,
    width: videoWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    maxWidth: 650,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  container: {
    width: videoWidth,
  },
});
