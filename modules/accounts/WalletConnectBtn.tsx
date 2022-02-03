import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import cursorPointer from 'app/constants/CursorPointer';
import Colors from 'app/constants/Colors';
import WalletConnectIcon from 'app/modules/ui/icons/walletconnect-icon';
import { Stores } from 'app/functions/Stores';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { observer } from 'mobx-react';

export default observer(({ signInWithPublicKey = (_) => {} }) => {
  let { walletConnectStore } = Stores();

  useEffect(() => {
    if (!walletConnectStore.uri) return QRCodeModal.close();
    QRCodeModal.open(walletConnectStore.uri, () => {}, { desktopLinks: [] });
  }, [walletConnectStore.uri]);

  useEffect(() => {
    if (!walletConnectStore.publicKey) return;
    signInWithPublicKey(walletConnectStore.publicKey);
  }, [walletConnectStore.publicKey]);

  return (
    <Pressable
      style={[styles.controlTouch, cursorPointer]}
      onPress={() => walletConnectStore.connect()}
    >
      <Text style={styles.btnText}>
        {walletConnectStore.state === 'session-proposal'
          ? 'Waiting for approval'
          : walletConnectStore.state === 'session-created'
          ? 'Connected'
          : 'WalletConnect'}
      </Text>
      <WalletConnectIcon />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  controlTouch: {
    backgroundColor: Colors.brandBlue,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 20,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
