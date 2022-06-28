import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Stores } from 'app/src/functions/Stores';
import Colors from 'app/src/constants/Colors';
import PlayBtnSmall from './play-btn-small/PlayBtnSmall';
import cursorPointer from 'app/src/constants/CursorPointer';
import ChevronUpIcon from 'app/src/ui/icons/chevron-up';

export default observer(() => {
  let { playerStore } = Stores();

  return (
    <View style={styles.bg}>
      <Pressable
        onPress={() => playerStore.showPlayer()}
        style={[cursorPointer]}
      >
        <View style={styles.section}>
          <View style={styles.icon}>
            <ChevronUpIcon color={Colors.white} />
          </View>
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
  rowControls: {
    maxWidth: 240,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  sliderControls: {
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  desktopWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(41, 43, 51, 0.9)',
    height: 96,
    paddingBottom: 4,
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
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
});
