import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { observer } from 'mobx-react';
import ChevronDown from 'app/src/ui/icons/chevron-down';
import Colors from 'app/src/constants/Colors';
import { Stores } from 'app/src/functions/Stores';

export default observer(({ onPress }) => {
  let { playerStore } = Stores();

  return (
    <View style={styles.playerNav}>
      <Pressable {...{ onPress }} style={styles.arrowDownTouchableArea}>
        <ChevronDown size={36} color={Colors.white} />
      </Pressable>
      <Text style={styles.header}>{playerStore.entry?.artist}</Text>
      <View style={styles.rightOptions} />
    </View>
  );
});

let styles = StyleSheet.create({
  playerNav: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowDownTouchableArea: {
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 2,
    width: 60,
    height: 40,
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
