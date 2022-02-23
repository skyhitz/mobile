import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from 'app/constants/Colors';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';
import CloseIcon from 'app/modules/ui/icons/x';

export default observer((props) => {
  let { entryStore } = Stores();
  return (
    <View style={styles.modal}>
      <View style={styles.modalWrap}>
        <Pressable
          style={styles.closeBtn}
          onPress={() => {
            entryStore.clearUploadingError();
            props.navigation.goBack();
          }}
        >
          <CloseIcon color={Colors.white} />
        </Pressable>
        <View>
          <Text style={styles.modalTitle}>Buy XLM</Text>
        </View>
      </View>
    </View>
  );
});

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
    width: '100%',
    maxWidth: 600,
    backgroundColor: Colors.overlayBackground,
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalTitle: {
    color: Colors.white,
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
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
