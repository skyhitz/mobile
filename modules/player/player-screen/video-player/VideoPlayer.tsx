import React from 'react';
import { Video, Audio } from 'expo-av';
import { View, NetInfo, StyleSheet, Platform } from 'react-native';
import { inject } from 'mobx-react';
import {
  CurrentTimeDisplay,
  DurationDisplay,
} from 'app/modules/player/player-screen/video-player/VideoTimeDisplay';
import {
  videoHeight,
  videoWidth,
} from 'app/modules/player/player-screen/video-player/VideoConstants';
import SpinnerView from 'app/modules/player/player-screen/video-player/SpinnerView';
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
    this._setupNetInfoListener();

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

  // componentWillUnmount() {
  // this.disposer();
  // }

  // disposer = observe(musicControlEvents, ({ object }) => {
  //   if (object.action === 'play') {
  //     return this.props.play();
  //   }
  //   if (object.action === 'pause') {
  //     return this.props.pause();
  //   }
  //   if (object.action === 'nextTrack') {
  //     return this.props.playNext();
  //   }
  //   if (object.action === 'previousTrack') {
  //     return this.props.playPrev();
  //   }
  // });

  componentWillUnmount() {
    NetInfo.removeEventListener(
      'connectionChange',
      this._onConnectionChange.bind(this)
    );
  }

  _onConnectionChange(connectionInfo: any) {
    this.props.debug && console.info('[networkState]', connectionInfo.type);
    this.props.setNetworkState(connectionInfo.type);
  }

  _setupNetInfoListener() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      this.props.debug && console.info('[networkState]', connectionInfo.type);
      this.props.setNetworkState(connectionInfo.type);
    });
    NetInfo.addEventListener(
      'connectionChange',
      this._onConnectionChange.bind(this)
    );
  }

  handleOnPlaybackStatusUpdate(status: any) {
    this.props.onPlaybackStatusUpdate(status);
    this.updateLockedScreenMusicControls(status);
  }

  // get hasntSetNowPlaying() {
  //   return this.props.entry.id !== this.state.playingNowEntryId;
  // }

  updateLockedScreenMusicControls(status: any) {
    // if (!this.props.entry) {
    //   return;
    // }
    // const {
    //   titleOnly,
    //   artistName,
    //   avatarUrlMedium,
    //   description,
    //   id,
    // } = this.props.entry;
    // if (!status.isLoaded) {
    //   return;
    // }
    // if (
    //   status.isPlaying &&
    //   !status.isBuffering &&
    //   status.positionMillis === 0 &&
    //   this.hasntSetNowPlaying
    // ) {
    //   this.setState({ playingNowEntryId: id });
    //   return setNowPlaying({
    //     title: titleOnly,
    //     artist: artistName,
    //     artwork: avatarUrlMedium,
    //     description: description.substring(0, 140),
    //     duration: Math.floor(status.durationMillis / 1000),
    //   });
    // }
    // updatePlayback(status);
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
          <SpinnerView />
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
    height: videoHeight,
  },
  container: {
    backgroundColor: 'black',
    width: videoWidth,
    height: videoHeight,
  },
});
