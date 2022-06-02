import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';
import { observer } from 'mobx-react';
import LogOutIcon from 'app/modules/ui/icons/logout';

export default observer(() => {
  const { sessionStore, likesStore, walletConnectStore } = Stores();
  const handleLogOut = async () => {
    await Promise.all([
      await sessionStore.signOut(),
      await walletConnectStore.disconnect(),
    ]);
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
