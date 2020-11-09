import { Value } from 'react-native-reanimated';
import { Audio, Video } from 'expo-av';

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  allowsRecordingIOS: false,
  staysActiveInBackground: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  shouldDuckAndroid: false,
  playThroughEarpieceAndroid: true,
});

const minutes = (v: number) => {
  const m = Math.floor(v / (60 * 1000));
  return m < 10 ? `0${m}` : `${m}`;
};

const seconds = (v: number) => {
  const s = Math.floor((v % (60 * 1000)) / 1000);
  return s < 10 ? `0${s}` : `${s}`;
};

export class PlayerV2Store {
  constructor() {}
  videoRef: Video | null = null;
  playback: Video | null = null;
  progress = new Value<number>(0);
  position = new Value<string>('00:00');
  total = new Value<string>('00:00');

  mountVideo = (component) => {
    this.videoRef = component;
  };

  async loadPlayback(playing, streamUrl = '') {
    if (this.playback != null) {
      await this.playback.unloadAsync();
      this.playback = null;
    }

    if (!streamUrl || !this.videoRef) return;
    await this.videoRef.loadAsync(
      { uri: streamUrl },
      {
        shouldPlay: playing,
      }
    );
    this.playback = this.videoRef;
  }

  onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      const { positionMillis } = status;
      const { playableDurationMillis } = status;
      if (playableDurationMillis) {
        this.progress.setValue(positionMillis / playableDurationMillis);
        this.position.setValue(
          `${minutes(positionMillis)}:${seconds(positionMillis)}`
        );
        this.total.setValue(
          `${minutes(playableDurationMillis)}:${seconds(
            playableDurationMillis
          )}`
        );
      }
    }
  }
}
