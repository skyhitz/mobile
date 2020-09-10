import React from 'react';
import PrevBtn from 'app/modules/player/player-screen/prev-btn/PrevBtn';
import ForwardBtn from 'app/modules/player/player-screen/forward-btn/ForwardBtn';
import ShuffleBtn from 'app/modules/player/player-screen/shuffle-btn/ShuffleBtn';
import LoopBtn from 'app/modules/player/player-screen/loop-btn/LoopBtn';
import PlayBtn from 'app/modules/player/player-screen/play-btn/PlayBtn';

import { StyleSheet, View } from 'react-native';

const PlayerControls = () => (
  <View style={styles.rowControls}>
    <LoopBtn />
    <PrevBtn />
    <PlayBtn />
    <ForwardBtn />
    <ShuffleBtn />
  </View>
);

export default PlayerControls;

var styles = StyleSheet.create({
  rowControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginBottom: 15,
    marginTop: 15,
    paddingRight: 20,
    paddingLeft: 20,
    maxWidth: 400,
    maxHeight: 40,
    width: '100%',
    alignSelf: 'center',
  },
});
