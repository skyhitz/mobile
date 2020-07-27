import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import VideoPlayer from './video-player/VideoPlayer';
import PlayerEntryInfo from './PlayerEntryInfo';
import BuyBtn from 'app/modules/ui/buy-btn/BuyBtn';
import PlayerControls from './player-controls/PlayerControls';
import LikersSection from './likers-section/LikersSection';
import Colors from 'app/constants/Colors';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 16,
  },
  title: {
    color: 'white',
    padding: 16,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  song: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  artist: {
    color: 'white',
  },
  slider: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: width - 32,
    borderRadius: 2,
    height: 4,
    marginVertical: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default observer(() => {
  let { playerStore } = Stores();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <RectButton
          style={styles.button}
          onPress={() => playerStore.hidePlayer()}
        >
          <Icon name="chevron-down" color="white" size={24} />
        </RectButton>
      </View>
      <VideoPlayer />
      <PlayerEntryInfo />
      <BuyBtn />
      <PlayerControls />
      <LikersSection />
    </SafeAreaView>
  );
});
