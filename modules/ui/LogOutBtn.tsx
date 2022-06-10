import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';
import { observer } from 'mobx-react';
import LogOutIcon from 'app/modules/ui/icons/logout';
import { useLinkTo } from '@react-navigation/native';

export default observer(() => {
  const linkTo = useLinkTo();
  const { sessionStore, likesStore, walletConnectStore } = Stores();
  const handleLogOut = async () => {
    await walletConnectStore.disconnect();
    await sessionStore.signOut();
    linkTo('/');
    likesStore.clearLikes();
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
