import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';
import { observer } from 'mobx-react';
import LogOutIcon from 'app/modules/ui/icons/logout';

export default observer(() => {
  const { sessionStore, likesStore } = Stores();
  const handleLogOut = async () => {
    await sessionStore.signOut();
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
