import React from 'react';
import { Video, Audio } from 'expo-av';
import { View, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import {
  CurrentTimeDisplay,
  DurationDisplay,
} from 'app/modules/player/player-screen/video-player/VideoTimeDisplay';
import { videoWidth } from 'app/modules/player/player-screen/video-player/VideoConstants';
import FullscreenControl from 'app/modules/player/player-screen/video-player/FullscreenControl';
import PlayPauseInvisibleArea from 'app/modules/player/player-screen/video-player/PlayPauseInvisibleArea';
import SeekBar from 'app/modules/player/player-screen/video-player/SeekBar';
import VideoErrorText from 'app/modules/player/player-screen/video-player/VideoErrorText';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;
// import {
//   setNowPlaying,
//   updatePlayback,
//   musicControlEvents,
// } from 'locked-screen-music-control';
// import { observe } from 'mobx';

@inject((stores: Stores) => ({
  onPlaybackStatusUpdate: stores.playerStore.onPlaybackStatusUpdate.bind(
    stores.playerStore
  ),
  setNetworkState: stores.playerStore.setNetworkState.bind(stores.playerStore),
  setPlaybackInstance: stores.playerStore.setPlaybackInstance.bind(
    stores.playerStore
  ),
  onError: stores.playerStore.onError.bind(stores.playerStore),
  onFullscreenUpdate: stores.playerStore.onFullscreenUpdate.bind(
    stores.playerStore
  ),
  entry: stores.playerStore.entry,
  play: stores.playerStore.playAsync.bind(stores.playerStore),
  pause: stores.playerStore.pauseAsync.bind(stores.playerStore),
  playNext: stores.playerStore.playNext.bind(stores.playerStore),
  playPrev: stores.playerStore.playPrev.bind(stores.playerStore),
}))
export default class VideoPlayer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      playingNowEntryId: '',
    };
  }

  async componentDidMount() {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
    });
  }

  handleOnPlaybackStatusUpdate(status: any) {
    this.props.onPlaybackStatusUpdate(status);
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Video
            ref={this.props.setPlaybackInstance.bind(this)}
            onPlaybackStatusUpdate={this.handleOnPlaybackStatusUpdate.bind(
              this
            )}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            style={styles.videoPlayer}
            onError={this.props.onError.bind(this)}
            onFullscreenUpdate={this.props.onFullscreenUpdate.bind(this)}
          />
          <PlayPauseInvisibleArea />
          <VideoErrorText />
        </View>

        {this.bottomBar()}
      </View>
    );
  }

  bottomBar() {
    return (
      <View style={styles.bottomBar}>
        <CurrentTimeDisplay />
        <SeekBar />
        <DurationDisplay />
        <FullscreenControl />
      </View>
    );
  }
}

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
