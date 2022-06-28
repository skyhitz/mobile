import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Colors from 'app/src/constants/Colors';
import { useLinkTo } from '@react-navigation/native';
import { Stores } from 'app/src/functions/Stores';
import { observer } from 'mobx-react';
import cursorPointer from 'app/src/constants/CursorPointer';

const DoneEditBtn = observer(() => {
  const linkTo = useLinkTo();
  const { editProfileStore } = Stores();

  const closeProfileModal = () => {
    editProfileStore.updateProfile();
    linkTo('/dashboard/profile');
  };
  return (
    <Pressable
      style={[styles.btn, cursorPointer]}
      onPress={closeProfileModal}
      disabled={!editProfileStore.canUpdate}
    >
      <Text
        style={[
          styles.white,
          { opacity: editProfileStore.canUpdate ? 1 : 0.4 },
        ]}
      >
        Done
      </Text>
    </Pressable>
  );
});

export default DoneEditBtn;

const styles = StyleSheet.create({
  btn: {
    paddingRight: 10,
  },
  white: {
    color: Colors.white,
  },
});
