import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import { Stores } from 'skyhitz-common';

@inject((stores: Stores) => ({
  uploadProfilePhoto: stores.editProfileStore.uploadProfilePhoto.bind(
    stores.editProfileStore
  ),
}))
export default class EditProfilePhotoBtn extends React.Component<any, any> {
  async changeProfilePhoto() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
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
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={this.changeProfilePhoto.bind(this)}
      >
        <Text style={{ color: Colors.white }}>Change Profile Photo</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginBottom: 20,
  },
});
