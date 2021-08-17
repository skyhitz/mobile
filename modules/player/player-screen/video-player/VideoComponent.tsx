import { Video } from 'expo-av';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';
import { Platform, StyleSheet } from 'react-native';
import { videoWidth } from './VideoConstants';
import { useState } from 'react';
import BlurImageBackground from './BlurImageBackground';

export default observer(({ dynamicHeight, desktop = false }) => {
  let { playerStore } = Stores();
  const [dynamicWidth, setDynamicWidth] = useState<number>(dynamicHeight);
  const [dynamicOpacity, setDynamicOpacity] = useState<number>(0);
  const [blur, setBlur] = useState<number>(0);

  return (
    <BlurImageBackground
      imageUrl={playerStore.entry?.imageUrl}
      opacity={dynamicOpacity}
      intensity={blur}
    >
      <Video
        posterSource={{ uri: playerStore.entry?.imageUrl }}
        usePoster={true}
        source={{
          uri: playerStore.streamUrl,
        }}
        posterStyle={[styles.poster, { width: dynamicWidth }]}
        ref={(ref) => playerStore.mountVideo(ref)}
        onPlaybackStatusUpdate={(status) =>
          playerStore.onPlaybackStatusUpdate(status)
        }
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        style={[
          { opacity: dynamicOpacity },
          desktop
            ? {
                maxWidth: dynamicWidth,
                width: dynamicWidth,
                minWidth: dynamicWidth,
              }
            : { height: dynamicHeight, maxHeight: 360 },
          desktop ? styles.videoPlayerDesktop : styles.videoPlayer,
        ]}
        onError={(error) => playerStore.onError(error)}
        onFullscreenUpdate={(update) => playerStore.onFullscreenUpdate(update)}
        onReadyForDisplay={(res: any) => {
          if (Platform.OS !== 'web') return;
          const { videoHeight, videoWidth } = res.target;
          const aspectRatio = videoWidth / videoHeight;
          if (videoWidth === 0) {
            setDynamicOpacity(1);
            return;
          }
          setDynamicWidth(Math.ceil(aspectRatio * dynamicHeight));
          // add delay or transition

          setBlur(80);
          setDynamicOpacity(1);
        }}
      />
    </BlurImageBackground>
  );
});

let styles = StyleSheet.create({
  videoPlayer: {
    width: videoWidth,
  },
  videoPlayerDesktop: {
    minHeight: 50,
    flex: 1,
  },
  poster: {
    height: 50,
  },
});
