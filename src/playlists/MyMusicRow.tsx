import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from 'app/src/constants/Colors';
import { useLinkTo } from '@react-navigation/native';
import cursorPointer from 'app/src/constants/CursorPointer';
import ChevronRightIcon from 'app/src/ui/icons/chevron-right';
import StarBorderIcon from 'app/src/ui/icons/star-border';
import { UserEntriesStore } from '../stores/user-entries.store';

export default () => {
  let { entries } = UserEntriesStore();
  let linkTo = useLinkTo();

  const handleNavigation = () => {
    linkTo('/dashboard/profile/collection');
  };

  const copy = () => {
    if (!entries.length) {
      return null;
    }
    return `${entries.length}`;
  };
  return (
    <View style={styles.rowWrap}>
      <View style={styles.rowWrap}>
        <Pressable style={cursorPointer} onPress={handleNavigation}>
          <View style={styles.row}>
            <View style={styles.leftSection}>
              <StarBorderIcon color={Colors.brandBlue} />
              <Text style={styles.likesText}>Collection</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.videosText}>{copy()}</Text>
              <ChevronRightIcon size={28} color={Colors.defaultTextLight} />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

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
    marginRight: 5,
  },
});
