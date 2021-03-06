import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Stores } from 'app/functions/Stores';
import Colors from 'app/constants/Colors';
import { EvilIcons } from '@expo/vector-icons';
import PlayBtnSmall from './play-btn-small/PlayBtnSmall';
import cursorPointer from 'app/constants/CursorPointer';

export default observer(() => {
  let { playerStore } = Stores();

  return (
    <View style={styles.bg}>
      <Pressable
        onPress={() => playerStore.showPlayer()}
        style={[cursorPointer]}
      >
        <View style={styles.section}>
          <EvilIcons
            name={'chevron-up'}
            size={36}
            color={Colors.white}
            style={styles.arrowUp}
          />
          <Text
            style={styles.entryTitle}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {playerStore.entry
              ? playerStore.entry.title + '  -  ' + playerStore.entry.artist
              : ''}
          </Text>
        </View>
      </Pressable>
      <PlayBtnSmall />
    </View>
  );
});

let styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(41, 43, 51, 0.9)',
  },
  section: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '70%',
    zIndex: 11,
  },
  entryTitle: {
    fontSize: 12,
    color: 'white',
    paddingLeft: 4,
    minWidth: 250,
  },
  arrowUp: {
    alignSelf: 'center',
  },
});
