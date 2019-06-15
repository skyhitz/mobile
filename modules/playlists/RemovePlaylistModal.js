/**
 * @providesModule remove-playlist-modal
 * @flow
 */

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { inject } from 'mobx-react/native';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { goBack } from 'app/modules/navigation/Navigator';

@inject(stores => ({
  remove: stores.playlistsStore.remove.bind(stores.playlistsStore),
  playlist: stores.playlistsStore.playlistToBeRemoved,
}))
export default class RemovePlaylistModal extends React.Component<any, any> {
  get title() {
    if (this.props.playlist && this.props.playlist.title) {
      return this.props.playlist.title;
    }
    return '';
  }
  async remove() {
    goBack();
    await this.props.remove();
  }
  render() {
    return (
      <View style={styles.modal}>
        <View style={styles.modalWrap}>
          <View>
            <Text style={styles.modalTitle}>Remove Playlist</Text>
          </View>
          <View>
            <Text style={styles.modalDescription}>
              Are you sure you want to remove {this.title}?
            </Text>
          </View>
          <View style={styles.modalActionsWrap}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => goBack()}
            >
              <Text style={styles.white}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.remove.bind(this)}
            >
              <View style={styles.actionBtn}>
                <Text style={styles.white}>REMOVE</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const modalWidth = Layout.window.width - 40;
const innerModalWidth = modalWidth - 50;

const styles = StyleSheet.create({
  white: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalWrap: {
    flex: 1,
    flexDirection: 'column',
    maxHeight: 220,
    width: modalWidth,
    backgroundColor: Colors.overlayBackground,
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalTitle: {
    color: Colors.white,
    fontSize: 18,
    height: 50,
    marginTop: 20,
  },
  modalDescription: {
    color: Colors.white,
    fontSize: 14,
    marginTop: 20,
  },
  modalActionsWrap: {
    maxHeight: 50,
    width: innerModalWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  actionBtn: {
    height: 40,
    width: 130,
    backgroundColor: Colors.brandBlue,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
