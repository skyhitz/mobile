import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import SelectPlaylistImage from 'app/modules/playlists/SelectPlaylistImage';
import Layout from 'app/constants/Layout';
import { goBack } from 'app/modules/navigation/Navigator';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  create: stores.playlistsStore.create.bind(stores.playlistsStore),
  modalPlaylistName: stores.playlistsStore.modalPlaylistName,
  modalPlaylistDescription: stores.playlistsStore.modalPlaylistDescription,
  updateModalPlaylistName: stores.playlistsStore.updateModalPlaylistName.bind(
    stores.playlistsStore
  ),
  updateModalPlaylistDescription: stores.playlistsStore.updateModalPlaylistDescription.bind(
    stores.playlistsStore
  ),
  canCreate: stores.playlistsStore.canCreate,
}))
export default class EditPlaylistModal extends React.Component<any, any> {
  async createPlaylist() {
    await this.props.create();
    goBack();
  }
  render() {
    return (
      <View style={styles.modal}>
        <View style={styles.modalWrap}>
          <View>
            <Text style={styles.modalTitle}>New Playlist</Text>
          </View>
          <View style={styles.field}>
            <MaterialIcons
              name="playlist-add"
              size={22}
              color={Colors.white}
              style={styles.placeholderIcon}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Name"
              autoCorrect={false}
              autoFocus={true}
              style={styles.input}
              placeholderTextColor="white"
              onChangeText={name => this.props.updateModalPlaylistName(name)}
              value={this.props.modalPlaylistName}
              maxLength={30}
            />
          </View>
          <View style={styles.field}>
            <MaterialIcons
              name="info-outline"
              size={22}
              color={Colors.white}
              style={styles.placeholderIcon}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Description"
              autoCorrect={false}
              autoFocus={false}
              style={styles.input}
              placeholderTextColor="white"
              onChangeText={name =>
                this.props.updateModalPlaylistDescription(name)
              }
              value={this.props.modalPlaylistDescription}
              maxLength={45}
            />
          </View>
          <SelectPlaylistImage />
          <View style={styles.modalActionsWrap}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => goBack()}>
              <Text style={styles.white}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!this.props.canCreate}
              onPress={this.createPlaylist.bind(this)}
            >
              <View
                style={[
                  styles.actionBtn,
                  { opacity: this.props.canCreate ? 1 : 0.6 },
                ]}
              >
                <Text style={styles.white}>CREATE</Text>
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
  btn: {
    backgroundColor: Colors.brandBlue,
    width: 200,
    height: 30,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnWrap: {
    flex: 1,
    backgroundColor: Colors.listItemBackground,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 100,
    top: 20,
  },
  listWrap: {
    backgroundColor: Colors.listItemBackground,
    flex: 1,
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
    maxHeight: 400,
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
  field: {
    height: 50,
    maxHeight: 50,
    flex: 1,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 14,
    paddingLeft: 30,
    width: 280,
    bottom: 0,
  },
  placeholderIcon: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    backgroundColor: Colors.transparent,
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
