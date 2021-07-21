import { Video } from 'expo-av';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';
import { StyleSheet } from 'react-native';
import { videoWidth } from './VideoConstants';

export default observer(({ dynamicHeight }) => {
  let { playerStore } = Stores();

  return (
    <Video
      posterSource={{ uri: playerStore.entry?.imageUrl }}
      source={{
        uri: playerStore.streamUrl,
      }}
      ref={(ref) => playerStore.mountVideo(ref)}
      onPlaybackStatusUpdate={(status) =>
        playerStore.onPlaybackStatusUpdate(status)
      }
      resizeMode={Video.RESIZE_MODE_CONTAIN}
      style={[styles.videoPlayer, { height: dynamicHeight, maxHeight: 360 }]}
      onError={(error) => playerStore.onError(error)}
      onFullscreenUpdate={(update) => playerStore.onFullscreenUpdate(update)}
    />
  );
});

let styles = StyleSheet.create({
  videoPlayer: {
    width: videoWidth,
  },
});
