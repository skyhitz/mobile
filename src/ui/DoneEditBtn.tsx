import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Colors from 'app/src/constants/Colors';
import { useLinkTo } from '@react-navigation/native';
import cursorPointer from 'app/src/constants/CursorPointer';
import { updateUser } from '../api/user';
import { SessionStore } from '../stores/session';
import { canUpdateProfileAtom, profileAtom } from '../atoms/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

const DoneEditBtn = () => {
  const linkTo = useLinkTo();

  const [
    { avatarUrl, displayName, description, username, email },
    setEditProfile,
  ] = useRecoilState(profileAtom);

  const canUpdate = useRecoilValue(canUpdateProfileAtom);
  const { refreshUser } = SessionStore();

  const updateProfile = async () => {
    let user;
    try {
      user = await updateUser(
        avatarUrl as string,
        displayName as string,
        description as string,
        username as string,
        email as string
      );
    } catch (e) {
      setEditProfile((oldState) => ({
        ...oldState,
        uploadError: (e as any).toString(),
      }));
      return;
    }
    if (user) {
      return await refreshUser();
    }
  };

  const closeProfileModal = () => {
    updateProfile();
    linkTo('/dashboard/profile');
  };

  return (
    <Pressable
      style={[styles.btn, cursorPointer]}
      onPress={closeProfileModal}
      disabled={!canUpdate}
    >
      <Text style={[styles.white, { opacity: canUpdate ? 1 : 0.4 }]}>Done</Text>
    </Pressable>
  );
};

export default DoneEditBtn;

const styles = StyleSheet.create({
  btn: {
    paddingRight: 10,
  },
  white: {
    color: Colors.white,
  },
});
