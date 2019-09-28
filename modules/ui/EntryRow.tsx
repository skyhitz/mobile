import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Layout from 'app/constants/Layout';
import Colors from 'app/constants/Colors';
import ThreeDots from 'app/modules/ui/ThreeDots';
import { navigate } from 'app/modules/navigation/Navigator';

const EntryRow = (
  play: any,
  entry: any,
  addRecentEntrySearch?: any,
  options?: any,
  disablePlaylistMode?: any,
  previousScreen?: any
) => {
  return (
    <View key={entry.id} style={styles.rowWrap}>
      <TouchableOpacity
        onPress={() => {
          // Clear the cue and disable playlist mode if user is searching
          if (disablePlaylistMode) {
            disablePlaylistMode();
          }
          play(entry);
          if (addRecentEntrySearch) {
            addRecentEntrySearch(entry.id);
          }
        }}
      >
        <View style={styles.row}>
          <Image source={{ uri: entry.imageUrl }} style={styles.thumb} />
          <View style={styles.infoWrap}>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
              {entry.title}
            </Text>
            <Text
              style={styles.artistName}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {entry.userDisplayName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <ThreeDots
        onPress={() =>
          navigate('EntryOptionsModal', {
            entry: entry,
            options: options,
            previousScreen: previousScreen,
          })
        }
      />
    </View>
  );
};

let styles = StyleSheet.create({
  rowWrap: {
    flex: 1,
    backgroundColor: Colors.listItemBackground,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 3,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.listItemBackground,
  },
  thumb: {
    width: 40,
    height: 30,
  },
  infoWrap: {
    maxWidth: Layout.window.width - 80,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 12,
    textAlign: 'left',
    fontWeight: 'bold',
    paddingLeft: 10,
    color: Colors.defaultTextDark,
  },
  artistName: {
    fontSize: 12,
    textAlign: 'left',
    paddingLeft: 10,
    marginTop: Platform.OS === 'ios' ? 3 : 0,
    color: Colors.defaultTextLight,
  },
});

export default EntryRow;
