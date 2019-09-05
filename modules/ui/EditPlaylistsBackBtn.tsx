import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { navigate, goBack } from 'app/modules/navigation/Navigator';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import * as stores from 'skyhitz-common';
type Stores = typeof stores;

@inject((stores:Stores) => ({
  editMode: stores.playlistsStore.editMode,
}))
export default class EditPlaylistsBackBtn extends React.Component<any, any> {
  showModal() {
    navigate('EditPlaylistModal');
  }
  render() {
    if (this.props.editMode) {
      return (
        <TouchableOpacity
          style={styles.btn}
          onPress={this.showModal.bind(this)}
        >
          <Text style={styles.white}>Create</Text>
        </TouchableOpacity>
      );
    }
    return (
      <HeaderBackButton tintColor={Colors.white} onPress={() => goBack()} />
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingLeft: 10,
  },
  white: {
    color: Colors.white,
  },
});
