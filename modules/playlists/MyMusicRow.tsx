import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { observer } from 'mobx-react';

import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';
import { useLinkTo } from '@react-navigation/native';
import cursorPointer from 'app/constants/CursorPointer';
import ChevronRightIcon from 'app/modules/ui/icons/chevron-right';
import StarBorderIcon from 'app/modules/ui/icons/star-border';

export default observer(() => {
  let { userEntriesStore } = Stores();
  let linkTo = useLinkTo();

  const handleNavigation = () => {
    linkTo('/dashboard/profile/my-music');
  };

  const copy = () => {
    if (!userEntriesStore.entriesCount) {
      return null;
    }
    if (userEntriesStore.entriesCount === 1) {
      return '1 Video';
    }
    return `${userEntriesStore.entriesCount} Videos`;
  };
  return (
    <View style={styles.rowWrap}>
      <View style={styles.rowWrap}>
        <Pressable style={cursorPointer} onPress={handleNavigation}>
          <View style={styles.row}>
            <View style={styles.leftSection}>
              <StarBorderIcon size={30} color={Colors.brandBlue} />
              <Text style={styles.likesText}>My Music</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.videosText}>{copy()}</Text>
              <ChevronRightIcon size={36} color={Colors.defaultTextLight} />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
});

let styles = StyleSheet.create({
  rowWrap: {
    flex: 1,
    backgroundColor: Colors.listItemBackground,
    maxHeight: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingTop: 9,
    paddingBottom: 6,
    paddingLeft: 20,
    paddingRight: 5,
    backgroundColor: Colors.listItemBackground,
  },
  leftSection: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  rightSection: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  likesText: {
    fontWeight: 'bold',
    color: Colors.defaultTextDark,
    paddingLeft: 10,
    minWidth: 100,
  },
  videosText: {
    color: Colors.defaultTextDark,
    paddingLeft: 5,
  },
});
