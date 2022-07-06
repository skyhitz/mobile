import React, { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import WalletConnectIcon from 'app/src/ui/icons/walletconnect-icon';
import QRCodeModal from '@walletconnect/qrcode-modal';
import tw from 'twin.macro';
import { signManageDataOp } from 'app/src/stellar';
import { WalletConnectStore } from '../stores/wallet-connect';

export default ({ signInWithXDR }: { signInWithXDR?: (_) => {} }) => {
  let { uri, signXdr, publicKey, connect, state } = WalletConnectStore();

  useEffect(() => {
    if (!uri) return QRCodeModal.close();
    QRCodeModal.open(uri, () => {}, {
      desktopLinks: [],
      mobileLinks: ['lobstr'],
    });
  }, [uri]);

  const handleSignInWithXdr = async (publicKey: string) => {
    const xdr = await signManageDataOp(publicKey);
    const { signedXDR } = await signXdr(xdr);
    signInWithXDR && signInWithXDR(signedXDR);
  };

  useEffect(() => {
    if (publicKey && signInWithXDR) handleSignInWithXdr(publicKey);
  }, [publicKey]);

  return (
    <Pressable
      style={tw`bg-blue rounded-full flex-row items-center justify-center text-white`}
      onPress={() => connect()}
    >
      <Text
        style={tw`flex text-white text-center text-base font-bold py-2 mr-2`}
      >
        {state === 'session-proposal'
          ? 'Waiting for approval'
          : state === 'session-created'
          ? 'Connected'
          : 'WalletConnect'}
      </Text>
      <WalletConnectIcon />
    </Pressable>
  );
};
