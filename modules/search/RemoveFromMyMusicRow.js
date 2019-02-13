import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { inject } from 'mobx-react/native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { goBack } from 'app/modules/navigation/Navigator';

@inject(stores => ({
  remove: stores.entryStore.remove.bind(stores.entryStore),
  refreshUserEntries: stores.userEntriesStore.refreshEntries.bind(stores.userEntriesStore)
}))
export default class RemoveFromMyMusicRow extends React.Component {
  async handleRemoveEntry() {
    await this.props.remove(this.props.entry.id, this.props.entry.cloudinaryPublicId);
    await this.props.refreshUserEntries();
    goBack();
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
    height: 50,
    width: Layout.window.width - 60,
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
