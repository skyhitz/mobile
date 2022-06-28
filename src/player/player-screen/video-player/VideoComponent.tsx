import { Video, Audio } from 'expo-av';
import { observer } from 'mobx-react';
import { Stores } from 'app/src/functions/Stores';
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

export default observer(({ desktop = false }) => {
  let { playerStore } = Stores();
  const [loading, setLoading] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);

  return (
    <BlurImageBackground
      image={
        loading || !hasVideo
          ? desktop
            ? playerStore.entry?.imageUrlSmall
            : playerStore.entry?.imageSrc
          : null
      }
      style={[playerStore.streamUrl && tw`bg-blue-dark`]}
      intensity={0}
    >
      <Video
        source={{
          uri: playerStore.streamUrl,
        }}
        ref={(ref) => {
          playerStore.mountVideo(ref);
        }}
        onPlaybackStatusUpdate={(status) => {
          playerStore.onPlaybackStatusUpdate(status);
        }}
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        style={[
          hasVideo && tw`bg-blue-dark`,
          desktop
            ? tw`h-12 w-12 flex-col justify-center p-0 m-0`
            : { maxHeight: 360 },
        ]}
        onError={(error) => playerStore.onError(error)}
        onFullscreenUpdate={(update) => playerStore.onFullscreenUpdate(update)}
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
});
