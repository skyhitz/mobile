import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react';
import { EvilIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { Stores } from 'skyhitz-common';

const PlayerNav = inject((stores:Stores) => ({
  hidePlayer: stores.playerStore.hidePlayer.bind(stores.playerStore),
  entry: stores.playerStore.entry,
}))(({ hidePlayer, entry }: any) => {
  if (!entry) {
    return null;
  }
  return (
    <View style={styles.playerNav}>
      <TouchableOpacity
        onPress={() => hidePlayer()}
        style={styles.arrowDownTouchableArea}
      >
        <EvilIcons
          name={'chevron-down'}
          size={36}
          color={Colors.white}
          style={styles.arrowDown}
        />
      </TouchableOpacity>
      <Text style={styles.header}>{entry.userUsername}</Text>
      <View style={styles.rightOptions} />
    </View>
  );
});

export default PlayerNav;

let styles = StyleSheet.create({
  playerNav: {
    height: 44,
    width: Layout.window.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowDownTouchableArea: {
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 2,
    width: 60,
    alignSelf: 'center',
  },
  arrowDown: {
    alignSelf: 'center',
  },
  rightOptions: {
    paddingLeft: 20,
    paddingRight: 20,
    width: 60,
  },
  header: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.white,
  },
});
