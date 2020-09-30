import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Stores } from 'app/functions/Stores';
import { observer } from 'mobx-react';
import cursorPointer from 'app/constants/CursorPointer';

const DoneEditBtn = observer(() => {
  const { goBack } = useNavigation();
  const { editProfileStore } = Stores();

  const closeProfileModal = () => {
    editProfileStore.updateProfile();
    goBack();
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
