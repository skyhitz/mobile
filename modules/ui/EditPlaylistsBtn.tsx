import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { navigate } from 'app/modules/navigation/Navigator';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import { Stores } from 'skyhitz-common';

@inject((stores:Stores) => ({
  edit: stores.playlistsStore.edit.bind(stores.playlistsStore),
  done: stores.playlistsStore.done.bind(stores.playlistsStore),
  editMode: stores.playlistsStore.editMode,
}))
export default class EditPlaylistsBtn extends React.Component<any, any> {
  async edit() {
    this.props.edit();
  }
  async done() {
    this.props.done();
  }
  render() {
    if (this.props.editMode) {
      return (
        <TouchableOpacity
          style={styles.btn}
          onPress={this.done.bind(this)}
        >
          <Text style={styles.white}>Done</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={this.edit.bind(this)}
      >
        <Text style={styles.white}>Edit</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingRight: 10,
  },
  white: {
    color: Colors.white,
  },
});
