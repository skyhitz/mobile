import React, { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import WalletConnectIcon from 'app/modules/ui/icons/walletconnect-icon';
import { Stores } from 'app/functions/Stores';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { observer } from 'mobx-react';
import tw from 'twin.macro';
import { generateFeeBumpXdr } from 'app/stellar';

export default observer(() => {
  let { walletConnectStore, sessionStore } = Stores();

  useEffect(() => {
    if (!walletConnectStore.uri) return QRCodeModal.close();
    QRCodeModal.open(walletConnectStore.uri, () => {}, {
      desktopLinks: [],
      mobileLinks: ['lobstr'],
    });
  }, [walletConnectStore.uri]);

  const signInWithXdr = async (publicKey: string) => {
    const xdr = await generateFeeBumpXdr(publicKey);
    console.log(xdr);
    const { result } = await walletConnectStore.signXdr(xdr);
    await sessionStore.signIn(undefined, undefined, result.signedXdr);
  };

  useEffect(() => {
    if (!walletConnectStore.publicKey) return;
    signInWithXdr(walletConnectStore.publicKey);
  }, [walletConnectStore.publicKey]);

  return (
    <Pressable
      style={tw`bg-blue rounded-full flex-row items-center justify-center text-white`}
      onPress={() => walletConnectStore.connect()}
    >
      <Text
        style={tw`flex text-white text-center text-base font-bold py-2 mr-2`}
      >
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
