import { PlayerStore } from 'app/src/stores/player';
import { Video, Audio } from 'expo-av';
import { useState } from 'react';
import tw from 'twin.macro';
import BlurImageBackground from './BlurImageBackground';

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  allowsRecordingIOS: false,
  staysActiveInBackground: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  shouldDuckAndroid: false,
  playThroughEarpieceAndroid: false,
});

export default ({ desktop = false }) => {
  const {
    entry,
    streamUrl,
    onPlaybackStatusUpdate,
    mountVideo,
    onFullscreenUpdate,
    onError,
  } = PlayerStore();
  const [loading, setLoading] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);

  return (
    <BlurImageBackground
      image={
        loading || !hasVideo
          ? desktop
            ? entry?.imageUrlSmall
            : entry?.imageSrc
          : null
      }
      style={[streamUrl && tw`bg-blue-dark`]}
      intensity={0}
    >
      <Video
        source={{
          uri: streamUrl,
        }}
        ref={(ref) => {
          mountVideo(ref);
        }}
        onPlaybackStatusUpdate={(status) => {
          onPlaybackStatusUpdate(status);
        }}
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        style={[
          hasVideo && tw`bg-blue-dark`,
          desktop
            ? tw`h-12 w-12 flex-col justify-center p-0 m-0`
            : { maxHeight: 360 },
        ]}
        onError={(error) => onError(error)}
        onFullscreenUpdate={(update) => onFullscreenUpdate(update)}
        onReadyForDisplay={(res: any) => {
          if (!res.target) return;
          const { videoHeight, videoWidth } = res.target;
          const aspectRatio = videoWidth / videoHeight;

          setHasVideo(!!aspectRatio);
        }}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
      />
    </BlurImageBackground>
  );
};
