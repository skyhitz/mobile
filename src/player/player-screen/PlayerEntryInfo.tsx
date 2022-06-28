import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { inject } from 'mobx-react';
import * as stores from 'app/src/stores';
type Stores = typeof stores;

const PlayerEntryInfo = inject((stores: Stores) => ({
  entry: stores.playerStore.entry,
}))(({ entry }: any) => {
  if (!entry) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.entryTitle} ellipsizeMode="tail" numberOfLines={1}>
          {entry.title}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.entryArtist} ellipsizeMode="tail" numberOfLines={1}>
          {entry.artist}
        </Text>
      </View>
    </View>
  );
});

export default PlayerEntryInfo;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    maxHeight: 130,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    height: 23,
  },
  entryArtist: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  entryTitle: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
