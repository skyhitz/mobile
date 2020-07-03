import React from 'react';
import { Video, Audio } from 'expo-av';
import { View, StyleSheet } from 'react-native';
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

  return (
    <View>
      <View style={styles.container}>
        <Video
          source={{
            uri: playerStore.streamUrl,
          }}
          ref={(ref) => playerStore.mountVideo(ref)}
          onPlaybackStatusUpdate={(status) =>
            playerStore.onPlaybackStatusUpdate(status)
          }
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          style={styles.videoPlayer}
          onError={(error) => playerStore.onError(error)}
          onFullscreenUpdate={(update) =>
            playerStore.onFullscreenUpdate(update)
          }
        />
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
  },
  videoPlayer: {
    width: videoWidth,
  },
  container: {
    backgroundColor: 'black',
    width: videoWidth,
  },
});
