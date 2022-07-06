import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from 'app/src/constants/Colors';
import LogOutIcon from 'app/src/ui/icons/logout';
import { useLinkTo } from '@react-navigation/native';
import { LikesStore } from '../stores/likes';
import { SessionStore } from '../stores/session';
import { WalletConnectStore } from '../stores/wallet-connect';

export default () => {
  const linkTo = useLinkTo();
  const { disconnect } = WalletConnectStore();
  const { signOut } = SessionStore();
  const { clearLikes } = LikesStore();

  const handleLogOut = async () => {
    await disconnect();
    await signOut();
    linkTo('/');
    clearLikes();
  };

  return (
    <Pressable style={styles.btn} onPress={handleLogOut}>
      <LogOutIcon size={24} color={Colors.white} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingRight: 10,
  },
});
