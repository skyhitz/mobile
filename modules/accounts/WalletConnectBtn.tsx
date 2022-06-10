import React, { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import WalletConnectIcon from 'app/modules/ui/icons/walletconnect-icon';
import { Stores } from 'app/functions/Stores';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { observer } from 'mobx-react';
import tw from 'twin.macro';
import { signManageDataOp } from 'app/stellar';

export default observer(({ signInWithXDR }: { signInWithXDR?: (_) => {} }) => {
  let { walletConnectStore } = Stores();

  const handleConnect = async () => {
    const { uri } = await walletConnectStore.connect();
    if (!uri) return QRCodeModal.close();
    QRCodeModal.open(uri, () => {}, {
      desktopLinks: [],
      mobileLinks: ['lobstr'],
    });
  };

  const handleSignInWithXdr = async (publicKey: string) => {
    const xdr = await signManageDataOp(publicKey);
    const { signedXDR } = await walletConnectStore.signXdr(xdr);
    signInWithXDR && signInWithXDR(signedXDR);
  };

  useEffect(() => {
    if (walletConnectStore.publicKey && signInWithXDR)
      handleSignInWithXdr(walletConnectStore.publicKey);
  }, [walletConnectStore.publicKey]);

  return (
    <Pressable
      style={tw`bg-blue rounded-full flex-row items-center justify-center text-white`}
      onPress={handleConnect}
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
