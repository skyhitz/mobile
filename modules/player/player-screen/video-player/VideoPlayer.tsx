import React, { useState } from 'react';
import { Video, Audio } from 'expo-av';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { observer } from 'mobx-react';
import {
  CurrentTimeDisplay,
  DurationDisplay,
} from 'app/modules/player/player-screen/video-player/VideoTimeDisplay';
import { videoWidth } from 'app/modules/player/player-screen/video-player/VideoConstants';
import FullscreenControl from 'app/modules/player/player-screen/video-player/FullscreenControl';
import PlayPauseInvisibleArea from 'app/modules/player/player-screen/video-player/PlayPauseInvisibleArea';
import VideoErrorText from 'app/modules/player/player-screen/video-player/VideoErrorText';
import { Stores } from 'app/functions/Stores';
import Slider from '../slider/Slider';

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

export default observer(() => {
  let [dynamicHeight, setDynamicHeight] = useState(0);
  let { playerStore } = Stores();
  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    shouldDuckAndroid: false,
    playThroughEarpieceAndroid: false,
  });

  const onLayout = ({ nativeEvent }) => {
    let { layout } = nativeEvent;
    let { width } = layout;
    setDynamicHeight(width * (9 / 16));
  };

  return (
    <View style={styles.container}>
      <View style={styles.container} onLayout={onLayout}>
        <ImageBackground
          source={{ uri: playerStore.entry?.imageUrl }}
          imageStyle={{ resizeMode: 'contain' }}
          style={[
            styles.videoPlayer,
            { height: dynamicHeight, maxHeight: 360 },
          ]}
        >
          <Video
            source={{
              uri: playerStore.streamUrl,
            }}
            ref={(ref) => playerStore.mountVideo(ref)}
            onPlaybackStatusUpdate={(status) =>
              playerStore.onPlaybackStatusUpdate(status)
            }
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            style={[
              styles.videoPlayer,
              { height: dynamicHeight, maxHeight: 360 },
            ]}
            onError={(error) => playerStore.onError(error)}
            onFullscreenUpdate={(update) =>
              playerStore.onFullscreenUpdate(update)
            }
          />
        </ImageBackground>
        <PlayPauseInvisibleArea />
        <VideoErrorText />
      </View>
      <BottomBar />
    </View>
  );
});

let styles = StyleSheet.create({
  bottomBar: {
    bottom: 0,
    width: videoWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    maxWidth: 650,
    marginTop: 5,
  },
  videoPlayer: {
    width: videoWidth,
  },
  container: {
    width: videoWidth,
  },
});
