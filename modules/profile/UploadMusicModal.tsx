import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import SelectMediaFile from 'app/modules/profile/SelectMediaFile';
import Layout from 'app/constants/Layout';
import { goBack } from 'app/modules/navigation/Navigator';
import { inject } from 'mobx-react';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  clearUploadingError: stores.entryStore.clearUploadingError.bind(stores.entryStore),
}))
export default class UploadMusicModal extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.modal}>
        <View style={styles.modalWrap}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => {
            this.props.clearUploadingError();
            goBack();
          }}>
            <MaterialIcons name="close" size={28} color={Colors.white} />
          </TouchableOpacity>
          <View>
            <Text style={styles.modalTitle}>New Track</Text>
          </View>
          <SelectMediaFile />
        </View>
      </View>
    );
  }
}

const modalWidth = Layout.window.width - 40;

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
    fontSize: 12,
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
    maxHeight: 500,
    width: modalWidth,
    backgroundColor: Colors.overlayBackground,
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalTitle: {
    color: Colors.white,
    fontSize: 18,
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
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
