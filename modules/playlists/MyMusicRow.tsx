import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import { navigate } from 'app/modules/navigation/Navigator';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  count: stores.userEntriesStore.entriesCount,
  entries: stores.userEntriesStore.entries,
}))
export default class MyMusicRow extends React.Component<any, any> {
  copy() {
    if (!this.props.count) {
      return null;
    }
    if (this.props.count === 1) {
      return '1 Video';
    }
    return `${this.props.count} Videos`;
  }
  handleNavigation() {
    navigate('MyMusicScreen');
  }
  render() {
    return (
      <View style={styles.rowWrap}>
        <View style={styles.rowWrap}>
          <TouchableOpacity onPress={this.handleNavigation.bind(this)}>
            <View style={styles.row}>
              <View style={styles.leftSection}>
                <MaterialIcons
                  name="star-border"
                  size={30}
                  color={Colors.brandBlue}
                />
                <Text style={styles.likesText}>My Music</Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.videosText}>{this.copy()}</Text>
                <EvilIcons
                  name={'chevron-right'}
                  size={36}
                  color={Colors.defaultTextLight}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
  },
  videosText: {
    color: Colors.defaultTextDark,
    paddingLeft: 5,
  },
});
