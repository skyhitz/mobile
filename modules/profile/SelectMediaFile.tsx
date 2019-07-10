import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { inject } from 'mobx-react';
import {
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons';
import { FileSystem } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import LargeBtn from 'app/modules/ui/LargeBtn';
import { goBack } from 'app/modules/navigation/Navigator';
import { Stores } from 'skyhitz-common';

export const LoadingIndicator = () => {
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

class CircleWrap extends React.Component<any, any> {
  render() {
    return (
      <View
        style={[
          styles.imageLoader,
          styles.activityIndicatorOffset,
          { backgroundColor: Colors.overlayBackground },
        ]}
      >
        {this.props.children}
      </View>
    );
  }
}

@inject((stores:Stores) => ({
  uploadVideo: stores.entryStore.uploadVideo.bind(stores.entryStore),
  uploadArtwork: stores.entryStore.uploadArtwork.bind(stores.entryStore),
  updateLoadingVideo: stores.entryStore.updateLoadingVideo.bind(
    stores.entryStore.updateLoadingVideo
  ),
  uploadingVideo: stores.entryStore.uploadingVideo,
  loadingVideo: stores.entryStore.loadingVideo,
  loadingArtwork: stores.entryStore.loadingArtwork,
  artworkUrl: stores.entryStore.artworkUrl,
  currentView: stores.entryStore.currentView,
  description: stores.entryStore.description,
  title: stores.entryStore.title,
  updateDescription: stores.entryStore.updateDescription.bind(
    stores.entryStore
  ),
  updateTitle: stores.entryStore.updateTitle.bind(stores.entryStore),
  create: stores.entryStore.create.bind(stores.entryStore),
  canCreate: stores.entryStore.canCreate,
  refreshUserEntries: stores.userEntriesStore.refreshEntries.bind(
    stores.userEntriesStore
  ),
  clearStore: stores.entryStore.clearStore.bind(stores.entryStore),
}))
export default class SelectMediaFile extends React.Component<any, any> {
  async selectVideo() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let video: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
      });

      this.props.updateLoadingVideo(true);
      let data = await FileSystem.readAsStringAsync(video.uri, {
        encoding: FileSystem.EncodingTypes.Base64,
      });
      this.props.updateLoadingVideo(false);
      if (video && !video.cancelled) {
        await this.props.uploadVideo(data);
      }
    }
  }

  async selectArtwork() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
        exif: true,
      });
      if (image && !image.cancelled) {
        await this.props.uploadArtwork(image);
      }
    }
  }

  renderUploadViewText() {
    if (this.props.loadingVideo) {
      return (
        <CircleWrap>
          <Text style={{ color: Colors.white }}>Loading...</Text>
        </CircleWrap>
      );
    }
    if (this.props.uploadingVideo) {
      return (
        <CircleWrap>
          <Text style={{ color: Colors.white }}>Uploading...</Text>
        </CircleWrap>
      );
    }
    return (
      <TouchableOpacity
        onPress={this.selectVideo.bind(this)}
      >
        <CircleWrap>
          <Text style={{ color: Colors.white }}>Select Video</Text>
        </CircleWrap>
      </TouchableOpacity>
    );
  }

  renderUploadView() {
    return (
      <View style={styles.wrap}>
        {this.renderUploadViewText()}
        <Text style={{ color: Colors.white, marginLeft: 20, marginRight: 20 }}>
          Only original video music related material will be uploaded. We take
          copyright law very seriously. Maximum file size allowed: 50MB
        </Text>
      </View>
    );
  }

  async onCreate() {
    await this.props.create();
    await this.props.refreshUserEntries();
    this.props.clearStore();
    goBack();
  }

  renderArtworkSection() {
    if (this.props.loadingArtwork) {
      return (
        <CircleWrap>
          <Text style={{ color: Colors.white }}>Uploading...</Text>
        </CircleWrap>
      );
    }
    if (!this.props.artworkUrl) {
      return (
        <TouchableOpacity
          onPress={this.selectArtwork.bind(this)}
        >
          <CircleWrap>
            <Text style={{ color: Colors.white }}>Select Artwork</Text>
          </CircleWrap>
        </TouchableOpacity>
      );
    }
    return (
      <Image
        source={{ uri: this.props.artworkUrl }}
        style={styles.imageLoader}
      />
    );
  }

  renderInfoView() {
    return (
      <View style={styles.wrap}>
        <View style={styles.inputContainerTop}>
          <View style={styles.field}>
            <FontAwesome
              name="info-circle"
              size={24}
              color={Colors.dividerBackground}
              style={styles.placeholderIcon}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Title"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="white"
              value={this.props.title}
              onChangeText={t => this.props.updateTitle(t)}
              maxLength={34}
            />
          </View>
          <View style={styles.fieldWithoutBorder}>
            <MaterialIcons
              name="description"
              size={22}
              color={Colors.dividerBackground}
              style={styles.placeholderIcon}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Description"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="white"
              value={this.props.description}
              onChangeText={t => this.props.updateDescription(t)}
              maxLength={60}
            />
          </View>
        </View>
        {this.renderArtworkSection()}
        <LargeBtn
          disabled={!this.props.canCreate}
          onPress={this.onCreate.bind(this)}
          text="Done"
        />
      </View>
    );
  }

  render() {
    if (this.props.currentView == 'upload') {
      return this.renderUploadView();
    }
    return this.renderInfoView();
  }
}
const formPadding = 20;
const circleSize = 120;
const circleBorderRadius = circleSize / 2;
const modalWidth = Layout.window.width - 100;

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  btn: {
    marginBottom: 20,
    marginTop: 20,
  },
  imageLoader: {
    borderRadius: circleBorderRadius,
    width: circleSize,
    height: circleSize,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorOffset: {
    paddingTop: 2,
    paddingLeft: 3,
  },
  field: {
    maxHeight: 40,
    width: modalWidth,
    flex: 1,
    borderBottomColor: Colors.dividerBackground,
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
  },
  fieldWithoutBorder: {
    width: modalWidth,
    maxHeight: 40,
    flex: 1,
    justifyContent: 'flex-end',
  },
  placeholderIcon: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    backgroundColor: Colors.transparent,
  },
  input: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 14,
    paddingLeft: 36,
    bottom: 8,
  },
  inputContainerTop: {
    flex: 1,
    maxHeight: 100,
  },
});
