import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import Colors from 'app/constants/Colors';

const SearchingLoader = (searching: any, query?: any) => {
  if (searching) {
    return (
      <View style={styles.rowWrap}>
        <View style={styles.row}>
          <ActivityIndicator color={Colors.defaultTextLight} size={'small'} />
          <View>
            {query ? (
              <Text
                style={styles.searchingText}
              >{`Searching for "${query}"`}</Text>
            ) : (
              <Text style={styles.searchingText}>{`Loading Beats...`}</Text>
            )}
          </View>
        </View>
      </View>
    );
  }
  return null;
};

let styles = StyleSheet.create({
  rowWrap: {
    flex: 1,
    backgroundColor: Colors.listItemBackground,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignItems: 'center',
    height: 50,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    backgroundColor: Colors.listItemBackground,
  },
  searchingText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10,
    marginBottom: 2,
    marginTop: 1,
    color: Colors.defaultTextLight,
  },
});

export default SearchingLoader;
