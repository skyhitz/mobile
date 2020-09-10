import { observable, computed, action } from 'mobx';
import { Entry } from '../models';
import { List } from 'immutable';
import { entriesBackend } from '../backends/entries.backend';
import { PlaybackState, SeekState, ControlsState } from '../types/index';
import Animated, { set, add } from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';

const { Value } = Animated;

export class PlayerStore {
  constructor() {}

  public observables: any = observable({
    entry: null,
  });
  @computed
  get entry(): any {
    return this.observables.entry;
  }

  @observable
  showMiniPlayer: boolean = false;
  @observable
  goUp: Animated.Value<0 | 1> = new Value(0);
  @observable
  goDown: Animated.Value<0 | 1> = new Value(0);

  @observable
  show: boolean = false;
  @observable
  tabBarBottomPosition: number = 0;
  @observable
  loop: boolean = false;
  @observable
  shuffle: boolean = false;
  @observable
  playbackState: PlaybackState = 'LOADING';
  @observable
  seekState: SeekState = 'NOT_SEEKING';
  @observable
  controlsState: ControlsState = 'SHOWN';
  @observable
  shouldPlay: boolean = false;
  @observable
  isOnFullScreenMode: boolean = false;
  @observable
  positionMillis: number = 0;
  @observable
  playbackInstancePosition: number = 0;
  @observable
  playbackInstanceDuration: number = 0;
  @observable
  lastPlaybackStateUpdate: number = Date.now();
  @observable
  error: any;
  @observable
  networkState: any;
  @observable
  shouldPlayAtEndOfSeek: boolean = false;
  @observable
  sliderWidth: number = 0;
  @observable
  cueList: List<Entry> = List([]);
  @observable
  currentIndex: number = 0;
  @observable
  retryTimes: number = 0;
  @observable
  playlistMode: boolean = false;
  @observable
  playbackInstance: any;
  seekPosition!: number;

  @observable
  streamUrl: string =
    'https://res.cloudinary.com/skyhitz/video/upload/v1554330926/app/-LbM3m6WKdVQAsY3zrAd/videos/-Lb_KsQ7hbr0nquOTZee.mov';

  video: any;

  translationX: Animated.Value<number> = new Value(0);
  sliderState: Animated.Value<number> = new Value(State.UNDETERMINED);
  sliderOffset: Animated.Value<number> = new Value(0);

  mountVideo = (component) => {
    this.video = component;
    this.loadNewPlaybackInstance(false);
  };

  async loadNewPlaybackInstance(playing, streamUrl = '') {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance = null;
    }

    if (!streamUrl) return;
    await this.video.loadAsync(
      { uri: streamUrl },
      {
        shouldPlay: playing,
        positionMillis: 0,
        progressUpdateIntervalMillis: 50,
      }
    );
    this.playbackInstance = this.video;
    if (playing && !this.isPlaying) {
      this.playAsync();
    }
  }

  @action
  async refreshEntry() {
    if (this.entry && this.entry.id) {
      let entry = await entriesBackend.getById(this.entry.id);
      this.observables.entry = entry;
    }
  }

  setPlaylistMode(entries: List<Entry>) {
    this.playlistMode = true;
    this.cueList = entries;
  }

  disablePlaylistMode() {
    this.playlistMode = false;
    this.cueList = List([]);
  }

  setPlaybackInstance(playbackInstance: any) {
    if (playbackInstance !== null) {
      this.playbackInstance = playbackInstance;
    }
  }

  @computed
  get playbackInstanceExists() {
    return !!this.playbackInstance;
  }

  async playAsync() {
    if (this.playbackInstanceExists) {
      this.setPlaybackState('PLAYING');
      return await this.playbackInstance.playAsync();
    }
  }

  async pauseAsync() {
    if (this.playbackInstanceExists) {
      this.setPlaybackState('PAUSED');
      await this.playbackInstance.pauseAsync();
      this.setPlaybackState('PAUSED');
      return true;
    }
  }

  async stopAsync() {
    if (this.playbackInstanceExists) {
      this.setPlaybackState('PAUSED');
      return await this.playbackInstance.stopAsync();
    }
  }

  async toggleLoop() {
    if (this.playbackInstanceExists) {
      this.loop = !this.loop;
      return await this.playbackInstance.setIsLoopingAsync(this.loop);
    }
  }

  async presentFullscreenPlayer() {
    if (this.playbackInstance) {
      await this.playbackInstance.presentFullscreenPlayer();
      return;
    }
  }

  async dismissFullscreenPlayer() {
    if (this.playbackInstance) {
      await this.playbackInstance.dismissFullscreenPlayer();
      return;
    }
  }

  onFullscreenUpdate(status: any) {
    if (status.fullscreenUpdate === 1) {
      this.isOnFullScreenMode = true;
    }

    if (status.fullscreenUpdate === 3) {
      this.isOnFullScreenMode = false;
      // resume video manually,
      // TODO: add bug to expo client on github.
      if (this.shouldPlay) {
        this.playAsync();
      }
    }
  }

  async togglePlay() {
    if (this.isPlaying) {
      return this.pauseAsync();
    }
    return this.playAsync();
  }

  async replay() {
    await this.stopAsync();
    this.setPlaybackState('PLAYING');
    return this.playAsync();
  }

  @computed
  get isPlaying() {
    if (this.playbackState === 'PLAYING') {
      return true;
    }
    return false;
  }

  async loadAndPlay(entry: Entry) {
    if (!entry) {
      return null;
    }
    if (
      this.cueList.findIndex((item) => !!item && item.id === entry.id) !== -1
    ) {
      this.currentIndex = this.cueList.findIndex(
        (item) => !!item && item.id === entry.id
      );
    }

    this.setPlaybackState('LOADING');
    this.observables.entry = entry;
    this.showPlayer();
    let { videoUrl } = entry;

    if (!videoUrl) {
      return;
    }
    let pos = videoUrl.lastIndexOf('.');
    videoUrl = videoUrl.substr(0, pos < 0 ? videoUrl.length : pos) + '.mp4';
    let optimizedVideo = '/upload/vc_auto/q_auto:good';
    videoUrl.replace('/upload', optimizedVideo);
    this.streamUrl = videoUrl;
    await this.loadNewPlaybackInstance(true, videoUrl);
    this.setPlaybackState('PLAYING');
    return;
  }

  async playNext() {
    this.setPlaybackState('LOADING');
    this.pauseAsync();

    if (this.isCurrentIndexAtTheEndOfCue) {
      // Override the value if playlistMode was set to true, it will loop through the
      // list instead of playing a related video.
      if (this.playlistMode) {
        let entry = this.cueList.get(0);
        this.currentIndex = 0;
        return this.loadAndPlay(entry);
      }
    }

    this.currentIndex++;
    let nextEntry = this.cueList.get(this.currentIndex);
    this.loadAndPlay(nextEntry);
  }

  async loadPlayAndPushToCueList(entry: Entry) {
    this.loadAndPlay(entry);
    this.cueList = this.cueList.push(this.entry);
    this.currentIndex = this.cueList.size - 1;
  }

  async loadPlayAndUnshiftToCueList(entry: Entry) {
    this.loadAndPlay(entry);
    this.cueList = this.cueList.unshift(this.entry);
    this.currentIndex = 0;
  }

  onError(e: string) {
    console.info(e);
  }

  @action
  toggleShuffle() {
    this.shuffle = !this.shuffle;
  }

  @action
  unmountMiniPlayer() {
    this.showMiniPlayer = false;
  }

  @action
  mountMiniPlayer() {
    this.showMiniPlayer = true;
  }

  @action
  hidePlayer() {
    this.show = false;
    this.goDown.setValue(1);
  }

  @action
  showPlayer() {
    this.show = true;
    this.goUp.setValue(1);
  }

  @computed
  get isCurrentIndexAtTheStartOfCue() {
    return this.currentIndex === 0;
  }

  @computed
  get isCurrentIndexAtTheEndOfCue() {
    return this.currentIndex === this.cueList.size - 1;
  }

  @action
  updateTabBarBottomPosition(bottom: number) {
    this.tabBarBottomPosition = bottom;
  }

  @computed
  get hideTabPlayer() {
    if (!this.entry) {
      return true;
    }
    return false;
  }

  async playPrev() {
    this.setPlaybackState('LOADING');
    this.pauseAsync();
    if (this.isCurrentIndexAtTheStartOfCue) {
      // Override the value if playlistMode was set to true, it will loop through the
      // list instead of playing a related video.
      if (this.playlistMode) {
        let lastIndexInCueList = this.cueList.size - 1;
        let entry = this.cueList.get(lastIndexInCueList);
        this.currentIndex = lastIndexInCueList;
        return this.loadAndPlay(entry);
      }

      return;
    }

    this.currentIndex--;
    let prevEntry = this.cueList.get(this.currentIndex);
    this.loadAndPlay(prevEntry);
  }

  padWithZero = (value: number) => {
    const result = value.toString();
    if (value < 10) {
      return '0' + result;
    }
    return result;
  };

  getMMSSFromMillis(millis: number) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);
    return this.padWithZero(minutes) + ':' + this.padWithZero(seconds);
  }

  @computed
  get durationDisplay() {
    return this.getMMSSFromMillis(this.playbackInstanceDuration);
  }

  @computed
  get positionDisplay() {
    return this.getMMSSFromMillis(this.playbackInstancePosition);
  }

  @action
  setSeekState(seekState: SeekState) {
    this.seekState = seekState;
  }

  @computed
  get seekSliderPosition() {
    if (
      this.playbackInstance !== null &&
      this.playbackInstancePosition != null &&
      this.playbackInstanceDuration != null &&
      this.playbackInstanceDuration !== 0
    ) {
      return this.playbackInstancePosition / this.playbackInstanceDuration;
    }
    return 0;
  }

  onSeekSliderValueChange = () => {
    if (
      this.playbackInstance !== null &&
      this.seekState !== 'SEEKING' &&
      this.seekState !== 'SEEKED'
    ) {
      this.shouldPlayAtEndOfSeek = false;
      this.setSeekState('SEEKING');

      if (this.isPlaying) {
        this.pauseAsync();
        this.shouldPlayAtEndOfSeek = true;
      }
    }
  };

  onSeekSliderSlidingComplete = async (value: number) => {
    if (this.playbackInstance != null && this.seekState !== 'SEEKED') {
      this.setSeekState('SEEKED');
      let status;
      try {
        status = await this.playbackInstance.setStatusAsync({
          positionMillis: value * this.playbackInstanceDuration,
          shouldPlay: this.shouldPlayAtEndOfSeek,
        });

        this.setSeekState('NOT_SEEKING');
        this.setPlaybackState(this.getPlaybackStateFromStatus(status));
      } catch (message) {}
    }
  };

  onSeekBarTap = (evt: any) => {
    if (
      !(
        this.playbackState === 'LOADING' ||
        this.playbackState === 'ENDED' ||
        this.playbackState === 'ERROR' ||
        this.controlsState !== 'SHOWN'
      )
    ) {
      const value = evt.nativeEvent.locationX / this.sliderWidth;
      this.onSeekSliderSlidingComplete(value);
    }
  };

  onSliderLayout = (evt: any) => {
    this.sliderWidth = evt.nativeEvent.layout.width;
  };

  setNetworkState(state: any) {
    this.networkState = state;
  }

  generateRandomNumber(max: number): number {
    var num = Math.floor(Math.random() * (max + 1));
    return num === this.currentIndex ? this.generateRandomNumber(max) : num;
  }

  async handleEndedPlaybackState() {
    if (this.playbackState === 'ENDED') {
      let pause = await this.pauseAsync();
      if (pause) {
        if (this.shuffle) {
          this.currentIndex = this.generateRandomNumber(this.cueList.size);
        }
        return this.playNext();
      }
    }
  }

  @computed
  get disablePlaybackStatusUpdate(): boolean {
    if (
      this.playbackState === 'ENDED' ||
      this.playbackState === 'LOADING' ||
      this.seekState === 'SEEKING' ||
      this.seekState === 'SEEKED'
    ) {
      return true;
    }
    return false;
  }

  setSliderPosition(position: number) {
    this.sliderOffset.setValue(position);
    this.translationX.setValue(0);
  }

  @action
  onPlaybackStatusUpdate(status: any) {
    if (this.disablePlaybackStatusUpdate) {
      return;
    }

    if (!status.isLoaded) {
      if (status.error) {
        const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
        this.error = errorMsg;
        return this.setPlaybackState('ERROR');
      }
      return;
    }

    if (this.networkState === 'none' && status.isBuffering) {
      this.setPlaybackState('ERROR');
      this.error =
        'You are probably offline. Please make sure you are connected to the Internet to watch this video';
      return;
    }

    if (status.isPlaying && !status.isBuffering) {
      this.playbackInstancePosition = status.positionMillis;
      this.playbackInstanceDuration = status.durationMillis;
      const position =
        (status.positionMillis / status.durationMillis) * this.sliderWidth;
      this.setSliderPosition(position);
    }

    this.shouldPlay = status.shouldPlay;

    this.setPlaybackState(this.getPlaybackStateFromStatus(status));
  }

  @action
  async setPlaybackState(playbackState: PlaybackState) {
    if (this.playbackState !== playbackState) {
      this.playbackState = playbackState;
      this.handleEndedPlaybackState();
      this.lastPlaybackStateUpdate = Date.now();
    }
  }

  getPlaybackStateFromStatus = (status: any) => {
    if (status.didJustFinish && !status.isLooping) {
      return 'ENDED';
    }

    if (status.isPlaying) {
      return 'PLAYING';
    }

    if (status.isBuffering) {
      return 'BUFFERING';
    }

    return 'PAUSED';
  };
}
