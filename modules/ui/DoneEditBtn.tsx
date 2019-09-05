import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import { goBack } from 'app/modules/navigation/Navigator';
import * as stores from 'skyhitz-common';
type Stores = typeof stores;

@inject((stores:Stores) => ({
  updateProfile: stores.editProfileStore.updateProfile.bind(
    stores.editProfileStore
  ),
  canUpdate: stores.editProfileStore.canUpdate,
}))
export default class DoneEditBtn extends React.Component<any, any> {
  async closeProfileModal() {
    this.props.updateProfile();
    goBack();
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={this.closeProfileModal.bind(this)}
        disabled={!this.props.canUpdate}
      >
        <Text
          style={[styles.white, { opacity: this.props.canUpdate ? 1 : 0.4 }]}
        >
          Done
        </Text>
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
