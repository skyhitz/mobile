import React from 'react';
import { Pressable, StyleSheet, Text, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useSetRecoilState } from 'recoil';
import Colors from 'app/src/constants/Colors';
import cursorPointer from 'app/src/constants/CursorPointer';
import { imagesGateway, nftStorageApi } from '../config/constants';
import { profileAtom } from '../atoms/atoms';

export default () => {
  const setEditProfile = useSetRecoilState(profileAtom);

  const uploadProfilePhoto = async (image) => {
    const isPng = image.uri.startsWith('data:image/png');
    if (!isPng) {
      setEditProfile((oldState) => ({
        ...oldState,
        uploadError: 'Only png files supported!',
      }));
      return;
    }
    if (image.height !== image.width) {
      setEditProfile((oldState) => ({
        ...oldState,
        uploadError: 'Only square images supported!',
      }));
      return;
    }
    const blobRes = await fetch(image.uri);
    const file = await blobRes.blob();
    setEditProfile((oldState) => ({ ...oldState, loadingAvatar: true }));
    let res = await fetch(`${nftStorageApi}/upload`, {
      method: 'POST',
      body: file,
      headers: new Headers({
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY}`,
      }),
    });
    let { value, ok } = await res.json();

    if (ok) {
      setEditProfile((oldState) => ({
        ...oldState,
        avatarUrl: `${imagesGateway}/${value.cid}`,
        loadingAvatar: false,
      }));
      return;
    }
    setEditProfile((oldState) => ({ ...oldState, loadingAvatar: false }));
  };

  const launchImageLibrary = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
      exif: true,
    });
    if (image && !image.cancelled) {
      uploadProfilePhoto(image);
    }
  };

  const changeProfilePhoto = async () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === 'granted') {
        return launchImageLibrary();
      }
    }
    launchImageLibrary();
  };

  return (
    <Pressable style={[styles.btn, cursorPointer]} onPress={changeProfilePhoto}>
      <Text style={{ color: Colors.white }}>Change Profile Photo</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginBottom: 20,
  },
});
