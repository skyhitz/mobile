import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { inject } from 'mobx-react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  remove: stores.entryStore.remove.bind(stores.entryStore),
  refreshUserEntries: stores.userEntriesStore.refreshEntries.bind(
    stores.userEntriesStore
  ),
}))
export default class RemoveFromMyMusicRow extends React.Component<any, any> {
  async handleRemoveEntry() {
    await this.props.remove(
      this.props.entry.id,
      this.props.entry.cloudinaryPublicId
    );
    await this.props.refreshUserEntries();
    this.props.navigation.goBack();
  }
  render() {
    if (!this.props.entry) {
      return null;
    }
    return (
      <TouchableOpacity onPress={this.handleRemoveEntry.bind(this)}>
        <View style={styles.field}>
          <MaterialIcons
            name={'remove-circle-outline'}
            size={30}
            color={Colors.white}
          />
          <Text style={styles.text}>Remove from platform</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 50,
    width: '100%',
  },
  text: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.white,
    paddingLeft: 10,
  },
  textLiked: {
    fontSize: 14,
    textAlign: 'left',
    paddingLeft: 10,
    color: Colors.brandBlue,
  },
});
