import { Video, Audio } from 'expo-av';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';
import { useState } from 'react';
import tw from 'twin.macro';
import { Platform } from 'react-native';

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
  const [readyForDisplay, setReadyForDisplay] = useState(false);

  return (
    <Video
      source={{
        uri: playerStore.streamUrl,
      }}
      ref={(ref) => {
        console.log(ref);
        playerStore.mountVideo(ref);
      }}
      onPlaybackStatusUpdate={(status) => {
        playerStore.onPlaybackStatusUpdate(status);
      }}
      resizeMode={Video.RESIZE_MODE_CONTAIN}
      style={[
        readyForDisplay && tw`bg-blue-dark`,
        desktop ? tw`h-12 w-12 flex-col justify-center` : { maxHeight: 360 },
      ]}
      onError={(error) => playerStore.onError(error)}
      onFullscreenUpdate={(update) => playerStore.onFullscreenUpdate(update)}
      onReadyForDisplay={(res: any) => {
        if (Platform.OS !== 'web') return;
        const { videoHeight, videoWidth } = res.target;
        const aspectRatio = videoWidth / videoHeight;
        console.log(aspectRatio);

        setReadyForDisplay(true);
      }}
    />
  );
});
