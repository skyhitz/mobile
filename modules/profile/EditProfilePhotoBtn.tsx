import React from 'react';
import { Pressable, StyleSheet, Text, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import * as stores from 'app/skyhitz-common';
import cursorPointer from 'app/constants/CursorPointer';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  uploadProfilePhoto: stores.editProfileStore.uploadProfilePhoto.bind(
    stores.editProfileStore
  ),
}))
export default class EditProfilePhotoBtn extends React.Component<any, any> {
  async launchImageLibrary() {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
      exif: true,
    });
    if (image && !image.cancelled) {
      this.props.uploadProfilePhoto(image);
    }
  }
  async changeProfilePhoto() {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === 'granted') {
        return this.launchImageLibrary();
      }
    }
    this.launchImageLibrary();
  }
  render() {
    return (
      <Pressable
        style={[styles.btn, cursorPointer]}
        onPress={this.changeProfilePhoto.bind(this)}
      >
        <Text style={{ color: Colors.white }}>Change Profile Photo</Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginBottom: 20,
  },
});
