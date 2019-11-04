import { observable, computed, action } from 'mobx';
import { Entry } from '../models';
import { List } from 'immutable';
import { entriesBackend } from '../backends/entries.backend';
import { youtubeApiBackend } from '../backends/youtube-api.backend';
import { PlaybackState, SeekState, ControlsState } from '../types/index';

export class PlayerStore {
  constructor() {}
  public observables = observable({
    entry: null,
  });
  @computed
  get entry(): Entry {
    return this.observables.entry;
  }
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
  sliderWidth: number;
  @observable
  cueList: List<Entry> = List([]);
  @observable
  currentIndex: number = 0;
  @observable
  retryTimes: number = 0;
  @observable
  playlistMode: boolean = false;
  playbackInstance: any;

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
      return await this.playbackInstance.pauseAsync();
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

  get isPlaying() {
    if (this.playbackState === 'PLAYING') {
      return true;
    }
    return false;
  }

  async loadAsync(streamUrl: string) {
    return await this.playbackInstance.loadAsync(
      { uri: streamUrl },
      { shouldPlay: true, positionMillis: 0 }
    );
  }

  async loadAndPlay(entry: Entry) {
    if (!entry) {
      return null;
    }

    if (this.cueList.findIndex(item => item.id === entry.id) !== -1) {
      this.currentIndex = this.cueList.findIndex(item => item.id === entry.id);
    }

    this.setPlaybackState('LOADING');
    this.observables.entry = entry;
    this.showPlayer();
    let { videoUrl } = entry;
    let loadStream = await this.loadAsync(videoUrl);
    this.setPlaybackState('PLAYING');
    return loadStream;
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

  async setPlaybackState(playbackState: PlaybackState) {
    if (this.playbackState !== playbackState) {
      this.playbackState = playbackState;
      this.handleEndedPlaybackState();
      this.lastPlaybackStateUpdate = Date.now();
    }
  }

  async handleEndedPlaybackState() {
    if (this.playbackState === 'ENDED') {
      let pause = await this.pauseAsync();
      if (pause) {
        return this.playNext();
      }
    }
  }

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

  onError(e: string) {
    console.info(e);
  }

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
    }

    this.shouldPlay = status.shouldPlay;

    this.setPlaybackState(this.getPlaybackStateFromStatus(status));
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

  toggleShuffle() {
    this.shuffle = !this.shuffle;
  }

  hidePlayer() {
    this.show = false;
  }

  showPlayer() {
    this.show = true;
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

  get isCurrentIndexAtTheStartOfCue() {
    return this.currentIndex === 0;
  }

  get isCurrentIndexAtTheEndOfCue() {
    return this.currentIndex === this.cueList.size - 1;
  }

  async getRelatedVideo() {
    let relatedVideoIds = await youtubeApiBackend.relatedVideoIds(
      this.entry.id
    );
    let relatedVideoId = this.findFirstRelatedVideoNotInCue(relatedVideoIds);
    let entry = await entriesBackend.getById(relatedVideoId);
    if (entry) {
      return entry;
    }
    let newEntry = await entriesBackend.create(relatedVideoId);
    if (newEntry) {
      return newEntry;
    }
    return null;
  }

  findFirstRelatedVideoNotInCue(relatedVideoIds: string[]) {
    let relatedVideoId = relatedVideoIds.find(videoId => {
      let index = this.cueList.findIndex(entry => {
        if (entry.id === videoId) {
          return true;
        }
        return false;
      });
      if (index === -1) {
        return true;
      }
      return false;
    });
    return relatedVideoId;
  }

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

  getMMSSFromMillis(millis: number) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (value: number) => {
      const result = value.toString();
      if (value < 10) {
        return '0' + result;
      }
      return result;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  get durationDisplay() {
    return this.getMMSSFromMillis(this.playbackInstanceDuration);
  }

  get positionDisplay() {
    return this.getMMSSFromMillis(this.playbackInstancePosition);
  }

  setSeekState(seekState: SeekState) {
    this.seekState = seekState;
  }

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
      this.setSeekState('SEEKING');

      this.shouldPlayAtEndOfSeek = this.shouldPlay;

      this.pauseAsync();
    }
  };

  onSeekSliderSlidingComplete = async (value: number) => {
    if (this.playbackInstance != null && this.seekState !== 'SEEKED') {
      this.setSeekState('SEEKED');
      // If the video is going to play after seek, the user expects a spinner.
      // Otherwise, the user expects the play button
      this.setPlaybackState(
        this.shouldPlayAtEndOfSeek ? 'BUFFERING' : 'PAUSED'
      );
      this.playbackInstance
        .setStatusAsync({
          positionMillis: value * this.playbackInstanceDuration,
          shouldPlay: this.shouldPlayAtEndOfSeek,
        })
        .then((status: any) => {
          this.setSeekState('NOT_SEEKING');
          this.setPlaybackState(this.getPlaybackStateFromStatus(status));
        })
        .catch((message: any) => {
          console.info('Seek error: ', message);
        });
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
      this.onSeekSliderValueChange();
      this.onSeekSliderSlidingComplete(value);
    }
  };

  onSliderLayout = (evt: any) => {
    this.sliderWidth = evt.nativeEvent.layout.width;
  };

  setNetworkState(state: any) {
    this.networkState = state;
  }
}
