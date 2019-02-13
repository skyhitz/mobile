// import MusicControl from 'react-native-music-control';
import { observable } from 'mobx';

type PlayingEvent = {
  title: string,
  artwork: string,
  artist: string,
  album?: string,
  genre?: string,
  duration: number,
  color?: number,
  date?: string,
  rating?: number,
  notificationIcon?: string,
};

type PlaybackEvent = {
  state: string,
  speed: number,
  elapsedTime: number,
  bufferedTime?: number,
  volume?: number,
  maxVolume?: number,
  rating?: string,
};

// MusicControl.enableBackgroundMode(true);
// MusicControl.handleAudioInterruptions(true);
// MusicControl.enableControl('play', true);
// MusicControl.enableControl('pause', true);
// MusicControl.enableControl('stop', false);
// MusicControl.enableControl('nextTrack', true);
// MusicControl.enableControl('previousTrack', true);
// Android Specific Options
// MusicControl.enableControl('setRating', false);
// MusicControl.enableControl('volume', true); // Only affected when remoteVolume is enabled
// MusicControl.enableControl('remoteVolume', false);

// function getState(status) {
//   if (status.didJustFinish && !status.isLooping) {
//     return MusicControl.STATE_ENDED;
//   }

//   if (status.isPlaying) {
//     return MusicControl.STATE_PLAYING;
//   }

//   if (status.isBuffering) {
//     return MusicControl.STATE_BUFFERING;
//   }

//   return MusicControl.STATE_PAUSED;
// }

// export function setNowPlaying(event: PlayingEvent) {
//   MusicControl.setNowPlaying(event);
// }

// export function updatePlayback(status: any) {
//   if (!status.positionMillis) {
//     return;
//   }
//   const event: PlaybackEvent = {
//     state: getState(status),
//     speed: 1,
//     elapsedTime: Math.floor(status.positionMillis / 1000),
//   };
//   MusicControl.updatePlayback(event);
// }

// export function resetNowPlayling() {
//   MusicControl.resetNowPlaying();
// }

// export function stopControl() {
//   MusicControl.stopControl();
// }

// type MusicControlActions = 'play' | 'pause' | 'nextTrack' | 'previousTrack';

// export let musicControlEvents = observable({
//   action: '',
//   timestamp: 0,
// });

// MusicControl.on('play', () => {
//   musicControlEvents.action = 'play';
// });

// // on iOS this event will also be triggered by audio router change events
// // happening when headphones are unplugged or a bluetooth audio peripheral disconnects from the device
// MusicControl.on('pause', () => {
//   musicControlEvents.action = 'pause';
// });

// MusicControl.on('nextTrack', () => {
//   musicControlEvents.action = 'nextTrack';
//   musicControlEvents.timestamp = Date.now();
// });

// MusicControl.on('previousTrack', () => {
//   musicControlEvents.action = 'previousTrack';
//   musicControlEvents.timestamp = Date.now();
// });
