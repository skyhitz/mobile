import React, { useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Colors from 'app/constants/Colors';
import LargeBtn from 'app/modules/ui/LargeBtn';
import cursorPointer from 'app/constants/CursorPointer';
import { Stores } from 'app/functions/Stores';
import { useLinkTo } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import PieChartIcon from 'app/modules/ui/icons/pie';
import InfoIcon from 'app/modules/ui/icons/info-circle';
import DollarIcon from 'app/modules/ui/icons/dollar';
import CircleIcon from 'app/modules/ui/icons/circle';
import UploadIcon from 'app/modules/ui/icons/upload';
import CheckIcon from 'app/modules/ui/icons/check';
import CloseIcon from 'app/modules/ui/icons/x';

const SwitchWeb: any = Switch;

const UploadView = ({ selectVideo, videoSelected, loadingVideo }) => {
  if (loadingVideo) {
    return <ActivityIndicator size="small" color={Colors.white} />;
  }
  if (videoSelected) {
    return <CheckIcon size={30} color={Colors.lightGreen} />;
  }
  return (
    <Pressable style={cursorPointer} onPress={selectVideo}>
      <UploadIcon size={30} color={Colors.white} />
    </Pressable>
  );
};

const UploadErrorView = ({ uploadingError, clearUploadingError }) => (
  <View style={styles.errorView}>
    <Text
      style={{
        color: Colors.white,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16,
      }}
    >
      {uploadingError}
    </Text>
    <Pressable style={cursorPointer} onPress={clearUploadingError}>
      <CloseIcon size={30} color={Colors.errorBackground} />
    </Pressable>
  </View>
);

const ArtworkSection = ({ imageSelected, selectArtwork }) => {
  if (!imageSelected) {
    return (
      <Pressable style={cursorPointer} onPress={selectArtwork}>
        <UploadIcon size={30} color={Colors.white} />
      </Pressable>
    );
  }
  return <CheckIcon size={30} color={Colors.lightGreen} />;
};

export default observer(() => {
  const { entryStore, userEntriesStore, walletConnectStore } = Stores();

  const linkTo = useLinkTo();
  let equityForSaleValue = entryStore.equityForSale;
  const getPermissionAsync = async () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
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
  useEffect(() => {
    getPermissionAsync();
  }, []);

  const selectVideo = async () => {
    let video: any;
    try {
      video = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        base64: true,
        quality: 1,
        exif: true,
      });
    } catch (e) {
      console.log('error', e);
      entryStore.setUploadingError('Error picking file!');
    }

    if (video && !video.cancelled) {
      entryStore.setLoadingVideo(true);
      const isMp4 = video.uri.startsWith('data:video/mp4');
      if (!isMp4) {
        entryStore.setUploadingError('Only mp4 files supported!');
        return;
      }

      const res = await fetch(video.uri);
      const file = await res.blob();
      entryStore.setLoadingVideo(false);
      entryStore.setVideoBlob(file);
    }
  };

  const selectArtwork = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
      exif: true,
    });
    if (image && !image.cancelled) {
      const isPng = image.uri.startsWith('data:image/png');
      if (!isPng) {
        entryStore.setUploadingError('Only png files supported!');
        return;
      }
      if (image.height !== image.width) {
        return entryStore.setUploadingError('Only square images supported!');
      }
      if (image.width < 3000) {
        return entryStore.setUploadingError(
          'Image should be at least 3000px wide!'
        );
      }
      const res = await fetch(image.uri);
      const file = await res.blob();
      entryStore.setImageBlob(file);
    }
  };

  const onCreate = async () => {
    const res = await entryStore.create();
    if (!res) {
      return entryStore.setUploadingError(
        'Something went wrong. Please try again!'
      );
    }
    let { xdr, submitted, success } = res;

    if (!success) {
      return entryStore.setUploadingError(
        'Something went very wrong. Please contact us!'
      );
    }

    if (!submitted) {
      const { status } = await walletConnectStore.signAndSubmitXdr(xdr);
      if (status !== 'success') {
        return entryStore.setUploadingError(
          'Something went very wrong. Please contact us!'
        );
      }
    }

    const indexed = await entryStore.indexEntry();
    if (!indexed) {
      return entryStore.setUploadingError(
        'Something went very wrong. Please contact us!'
      );
    }
    await userEntriesStore.refreshEntries();
    entryStore.clearStore();
    linkTo('/dashboard/profile');
    return;
  };

  if (entryStore.uploadingError) {
    return (
      <UploadErrorView
        uploadingError={entryStore.uploadingError}
        clearUploadingError={() => entryStore.clearUploadingError()}
      />
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.field}>
        <InfoIcon size={24} color={Colors.dividerBackground} />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          placeholder="Artist"
          autoCorrect={false}
          autoFocus={true}
          style={[
            styles.input,
            Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
          ]}
          placeholderTextColor="white"
          value={entryStore.artist}
          onChangeText={(t) => entryStore.updateArtist(t)}
          maxLength={34}
        />
      </View>
      <View style={styles.field}>
        <InfoIcon size={24} color={Colors.dividerBackground} />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          placeholder="Title"
          autoCorrect={false}
          style={[
            styles.input,
            Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
          ]}
          placeholderTextColor="white"
          value={entryStore.title}
          onChangeText={(t) => entryStore.updateTitle(t)}
          maxLength={34}
        />
      </View>
      <View style={styles.field}>
        <InfoIcon size={22} color={Colors.dividerBackground} />
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          placeholder="Description"
          autoCorrect={false}
          style={[
            styles.input,
            Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
          ]}
          placeholderTextColor="white"
          value={entryStore.description}
          onChangeText={(t) => entryStore.updateDescription(t)}
          maxLength={60}
        />
      </View>
      <View style={styles.field}>
        <CircleIcon
          size={10}
          color={
            entryStore.availableForSale
              ? Colors.lightBrandBlue
              : Colors.dividerBackground
          }
        />
        <Text
          style={styles.priceDescription}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {'Available for Sale: '}
        </Text>
        <SwitchWeb
          onValueChange={(forSale) =>
            entryStore.updateAvailableForSale(forSale)
          }
          value={entryStore.availableForSale}
          style={[
            styles.switch,
            Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
          ]}
          activeThumbColor={Colors.defaultTextLight}
          trackColor={{
            false: Colors.defaultTextLight,
            true: Colors.lightBrandBlue,
          }}
          thumbColor={Colors.defaultTextLight}
        />
      </View>
      {entryStore.availableForSale && (
        <>
          <View style={styles.field}>
            <DollarIcon size={20} color={Colors.dividerBackground} />

            <Text
              style={styles.priceUSDDescription}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {'Price (XLM):'}
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              returnKeyType={'done'}
              placeholder=""
              keyboardType={'numeric'}
              autoCorrect={false}
              style={[
                styles.priceInput,
                Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
              ]}
              placeholderTextColor="white"
              value={entryStore.price ? entryStore.price.toString() : ''}
              onChangeText={(price) => entryStore.updatePrice(parseInt(price))}
              maxLength={30}
            />
          </View>
          <View style={styles.field}>
            <PieChartIcon size={24} color={Colors.dividerBackground} />
            <Text
              style={styles.priceDescription}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {'Equity for Sale: '}
              {entryStore.equityForSalePercentage}
            </Text>

            <Slider
              style={{ flex: 1 }}
              minimumValue={1}
              maximumValue={100}
              value={equityForSaleValue}
              onValueChange={(target) => {
                entryStore.updateEquityForSalePercentage(target);
              }}
              step={1}
              minimumTrackTintColor={Colors.brandBlue}
              maximumTrackTintColor={Colors.backgroundTrackColor}
              thumbTintColor={Colors.brandBlue}
            />
          </View>
        </>
      )}
      <View style={styles.field}>
        <InfoIcon size={22} color={Colors.dividerBackground} />
        <Text
          style={styles.priceUSDDescription}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {'Artwork: '}
        </Text>
        <ArtworkSection
          imageSelected={!!entryStore.imageBlob}
          selectArtwork={selectArtwork}
        />
      </View>
      <View style={styles.field}>
        <InfoIcon size={22} color={Colors.dividerBackground} />
        <Text
          style={styles.priceUSDDescription}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {'MP4: '}
        </Text>

        <UploadView
          videoSelected={!!entryStore.videoBlob}
          selectVideo={selectVideo}
          loadingVideo={entryStore.loadingVideo}
        />
      </View>
      <View style={styles.field}>
        <Text style={{ color: Colors.white }}>
          Only original video music related material will be uploaded. We take
          copyright law very seriously. Maximum file size allowed: 100MB
        </Text>
      </View>

      <View style={styles.btn}>
        <LargeBtn
          disabled={!entryStore.canCreate}
          onPress={onCreate}
          text={
            entryStore.creating
              ? entryStore.currentUpload === 'video'
                ? `Uploading Files ${entryStore.progress}%`
                : entryStore.currentUpload === 'meta'
                ? `Uploading Meta`
                : 'Uploading'
              : 'Mint'
          }
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 100,
    paddingHorizontal: 20,
  },
  errorView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  activityIndicatorOffset: {
    paddingTop: 2,
    paddingLeft: 3,
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 70,
    borderBottomColor: Colors.dividerBackground,
    borderBottomWidth: 1,
  },
  emptyField: {
    minHeight: 73,
    flex: 1,
    minWidth: 367,
  },
  placeholderIcon: {
    backgroundColor: Colors.transparent,
  },
  input: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 16,
    paddingLeft: 10,
    flexGrow: 1,
  },
  priceInput: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    height: 28,
    color: Colors.black,
    fontSize: 14,
    paddingLeft: 10,
  },
  switch: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 14,
  },
  inputContainerTop: {
    flex: 1,
    marginBottom: 30,
  },
  priceDescription: {
    color: Colors.defaultTextLight,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 20,
    maxWidth: 190,
    width: 190,
  },
  priceUSDDescription: {
    color: Colors.defaultTextLight,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 20,
    maxWidth: 190,
    flexGrow: 1,
  },
});
