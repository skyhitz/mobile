import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import { inject } from 'mobx-react';
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Colors from 'app/constants/Colors';
import LargeBtn from 'app/modules/ui/LargeBtn';
import * as stores from 'app/skyhitz-common';

type Stores = typeof stores;

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

@inject((stores: Stores) => ({
  uploadVideo: stores.entryStore.uploadVideo.bind(stores.entryStore),
  uploadingError: stores.entryStore.uploadingError,
  clearUploadingError: stores.entryStore.clearUploadingError.bind(
    stores.entryStore
  ),
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
  updateArtist: stores.entryStore.updateArtist.bind(stores.entryStore),
  create: stores.entryStore.create.bind(stores.entryStore),
  canCreate: stores.entryStore.canCreate,
  refreshUserEntries: stores.userEntriesStore.refreshEntries.bind(
    stores.userEntriesStore
  ),
  clearStore: stores.entryStore.clearStore.bind(stores.entryStore),
  updateAvailableForSale: stores.entryStore.updateAvailableForSale.bind(
    stores.entryStore
  ),
  updatePrice: stores.entryStore.updatePrice.bind(stores.entryStore),
  availableForSale: stores.entryStore.availableForSale,
  price: stores.entryStore.price,
}))
export default class SelectMediaFile extends React.Component<any, any> {
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission',
          'We need camera permissions so you can upload beats!',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: true }
        );
      }
    }
  };

  async selectVideo() {
    let video: any;
    try {
      video = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
      });
    } catch (e) {
      console.log('error', e);
    }

    if (video && !video.cancelled) {
      await this.props.uploadVideo(video);
    }
  }

  async selectArtwork() {
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
      <Pressable onPress={this.selectVideo.bind(this)}>
        <CircleWrap>
          <Text style={{ color: Colors.white }}>Select Video</Text>
        </CircleWrap>
      </Pressable>
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

  renderUploadErrorView() {
    return (
      <View style={styles.wrap}>
        <Text style={{ color: Colors.white, marginLeft: 20, marginRight: 20 }}>
          {this.props.uploadingError}
        </Text>
      </View>
    );
  }

  async onCreate() {
    await this.props.create();
    await this.props.refreshUserEntries();
    this.props.clearStore();
    this.props.navigation.goBack();
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
        <Pressable onPress={this.selectArtwork.bind(this)}>
          <CircleWrap>
            <Text style={{ color: Colors.white }}>Select Artwork</Text>
          </CircleWrap>
        </Pressable>
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
              placeholder="Artist"
              autoCorrect={false}
              autoFocus={true}
              style={styles.input}
              placeholderTextColor="white"
              value={this.props.artist}
              onChangeText={(t) => this.props.updateArtist(t)}
              maxLength={34}
            />
          </View>
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
              onChangeText={(t) => this.props.updateTitle(t)}
              maxLength={34}
            />
          </View>
          <View style={styles.field}>
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
              onChangeText={(t) => this.props.updateDescription(t)}
              maxLength={60}
            />
          </View>
          <View style={styles.field}>
            <MaterialIcons
              name={'attach-money'}
              size={20}
              color={Colors.dividerBackground}
              style={styles.placeholderIcon}
            />
            <Text
              style={styles.priceDescription}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {'Price USD: '}
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              returnKeyType={'done'}
              placeholder=""
              keyboardType={'numeric'}
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="white"
              value={this.props.price}
              onChangeText={(price) => this.props.updatePrice(price)}
              maxLength={30}
            />
          </View>
          <View style={styles.field}>
            <MaterialCommunityIcons
              name="circle-medium"
              size={24}
              color={
                this.props.availableForSale
                  ? Colors.lightBrandBlue
                  : Colors.dividerBackground
              }
              style={styles.placeholderIcon}
            />
            <Text
              style={styles.priceDescription}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {'Available for Sale: '}
            </Text>
            <Switch
              onValueChange={(forSale) =>
                this.props.updateAvailableForSale(forSale)
              }
              value={this.props.availableForSale}
              style={styles.input}
              trackColor={{
                false: Colors.defaultTextLight,
                true: Colors.lightBrandBlue,
              }}
              thumbColor={Colors.lightGrey}
            />
          </View>
        </View>
        {this.renderArtworkSection()}
        <View style={styles.btn}>
          <LargeBtn
            disabled={!this.props.canCreate}
            onPress={this.onCreate.bind(this)}
            text="Done"
          />
        </View>
      </View>
    );
  }

  render() {
    if (this.props.uploadingError) {
      return this.renderUploadErrorView();
    }
    if (this.props.currentView == 'upload') {
      return this.renderUploadView();
    }
    return this.renderInfoView();
  }
}

const circleSize = 120;
const circleBorderRadius = circleSize / 2;

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  btn: {
    marginTop: 40,
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    flex: 1,
    borderBottomColor: Colors.dividerBackground,
    borderBottomWidth: 1,
    minWidth: 300,
  },
  placeholderIcon: {
    backgroundColor: Colors.transparent,
  },
  input: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 14,
    paddingLeft: 10,
  },
  inputContainerTop: {
    flex: 1,
    maxHeight: 250,
    marginBottom: 40,
  },
  priceDescription: {
    color: Colors.defaultTextLight,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 40,
  },
});
