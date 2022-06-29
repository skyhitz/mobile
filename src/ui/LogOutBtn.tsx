import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from 'app/src/constants/Colors';
import { Stores } from 'app/src/functions/Stores';
import { observer } from 'mobx-react';
import LogOutIcon from 'app/src/ui/icons/logout';
import { useLinkTo } from '@react-navigation/native';
import { LikesStore } from '../stores/likes.store';
import { SessionStore } from '../stores/session';

export default observer(() => {
  const linkTo = useLinkTo();
  const { walletConnectStore } = Stores();
  const { signOut } = SessionStore();
  const { clearLikes } = LikesStore();

  const handleLogOut = async () => {
    await walletConnectStore.disconnect();
    await signOut();
    linkTo('/');
    clearLikes();
  };

  return (
    <Pressable style={styles.btn} onPress={handleLogOut}>
      <LogOutIcon size={24} color={Colors.white} />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  btn: {
    paddingRight: 10,
  },
});
