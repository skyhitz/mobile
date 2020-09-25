import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import Layout from 'app/constants/Layout';
import Colors from 'app/constants/Colors';
import ThreeDots from 'app/modules/ui/ThreeDots';
import { useNavigation } from '@react-navigation/native';

export default ({
  play,
  entry,
  addRecentEntrySearch,
  options,
  disablePlaylistMode,
  previousScreen,
  position,
}) => {
  const { navigate } = useNavigation();
  return (
    <View key={entry.id} style={styles.rowWrap}>
      <Pressable
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
          <Image source={{ uri: entry.imageUrlSmall }} style={styles.thumb} />
          <View style={styles.numberWrap}>
            <Text style={styles.numbersText}>{position}</Text>
          </View>
          <View style={styles.infoWrap}>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
              {entry.title}
            </Text>
            <Text
              style={styles.artistName}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {entry.artist}
            </Text>
          </View>
        </View>
      </Pressable>
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
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  numbersText: {
    color: Colors.defaultTextLight,
    fontSize: 24,
    textAlign: 'center',
  },
  numberWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 30,
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
    paddingLeft: 0,
  },
  title: {
    fontSize: 12,
    textAlign: 'left',
    fontWeight: 'bold',
    color: Colors.defaultTextDark,
  },
  artistName: {
    fontSize: 12,
    textAlign: 'left',
    marginTop: Platform.OS === 'ios' ? 3 : 0,
    color: Colors.defaultTextLight,
  },
});
