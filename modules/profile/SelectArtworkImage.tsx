import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

export const LoadingImage = () => {
  return (
    <View
      style={[
        styles.imageLoader,
        styles.activityIndicatorOffset,
        { backgroundColor: Colors.overlayBackground },
      ]}
    >
      <ActivityIndicator color={Colors.white} size={'large'} />
    </View>
  );
};

@inject((stores: Stores) => ({
  uploadImage: stores.playlistsStore.uploadImage.bind(stores.playlistsStore),
  playlistPhotoUrl: stores.playlistsStore.modalPlaylistPhotoUrl,
  loadingImage: stores.playlistsStore.loadingImage,
}))
export default class SelectArtworkImage extends React.Component<any, any> {
  async selectImage() {
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
        this.props.uploadImage(image);
      }
    }
  }
  renderImage() {
    if (this.props.loadingImage) {
      return <LoadingImage />;
    }
    if (!this.props.playlistPhotoUrl) {
      return (
        <Pressable onPress={this.selectImage.bind(this)}>
          <View style={styles.imageLoader}>
            <FontAwesome name={'plus'} size={25} color={Colors.white} />
          </View>
        </Pressable>
      );
    }
    return (
      <Image
        source={{ uri: this.props.playlistPhotoUrl }}
        style={styles.thumb}
      />
    );
  }
  render() {
    return (
      <View style={styles.wrap}>
        {this.renderImage()}
        <Pressable style={styles.btn} onPress={this.selectImage.bind(this)}>
          <Text style={{ color: Colors.white }}>Select Artwork</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginBottom: 20,
    marginTop: 20,
  },
  thumb: {
    marginTop: 60,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  imageLoader: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorOffset: {
    paddingTop: 2,
    paddingLeft: 3,
  },
});
