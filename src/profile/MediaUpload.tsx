import React, { useEffect, useState } from 'react';
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
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Permissions from 'expo-permissions';
import Colors from 'app/src/constants/Colors';
import LargeBtn from 'app/src/ui/LargeBtn';
import cursorPointer from 'app/src/constants/CursorPointer';
import { useLinkTo } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import PieChartIcon from 'app/src/ui/icons/pie';
import InfoIcon from 'app/src/ui/icons/info-circle';
import DollarIcon from 'app/src/ui/icons/dollar';
import CircleIcon from 'app/src/ui/icons/circle';
import UploadIcon from 'app/src/ui/icons/upload';
import CheckIcon from 'app/src/ui/icons/check';
import CloseIcon from 'app/src/ui/icons/x';
import nftListener from 'app/src/hooks/nft-listener';
import { UserEntriesStore } from '../stores/user-entries';
import { EntryStore } from '../stores/entry.store';
import { WalletConnectStore } from '../stores/wallet-connect';

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

export default () => {
  const { signAndSubmitXdr } = WalletConnectStore();
  const {
    equityForSale,
    setUploadingError,
    create,
    canCreate,
    setLoadingVideo,
    setImageBlob,
    setVideoBlob,
    clearStore,
    uploadingError,
    clearUploadingError,
    setArtist,
    artist,
    title,
    setTitle,
    availableForSale,
    setAvailableForSale,
    description,
    setDescription,
    setPrice,
    price,
    setEquityForSale,
    equityForSalePercentage,
    imageBlob,
    videoBlob,
    creating,
    currentUpload,
    loadingVideo,
    progress,
  } = EntryStore();
  const { refreshEntries } = UserEntriesStore();

  const linkTo = useLinkTo();
  const [openListener, setOpenListener] = useState(false);
  const { indexed } = nftListener(openListener);

  let equityForSaleValue = equityForSale;
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
      video = await DocumentPicker.getDocumentAsync({
        type: ['video/*', 'audio/*'],
        multiple: false,
      });
    } catch (e) {
      console.log('error', e);
      setUploadingError('Error picking file!');
    }

    if (video && !video.cancelled) {
      setLoadingVideo(true);
      // const isMp4 = video.uri.startsWith('data:video/mp4');
      // if (!isMp4) {
      //   setUploadingError('Only mp4 files supported!');
      //   return;
      // }

      const res = await fetch(video.uri);
      const file = await res.blob();
      setLoadingVideo(false);
      setVideoBlob(file);
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
        setUploadingError('Only png files supported!');
        return;
      }
      if (image.height !== image.width) {
        return setUploadingError('Only square images supported!');
      }
      if (image.width < 3000) {
        return setUploadingError('Image should be at least 3000px wide!');
      }
      const res = await fetch(image.uri);
      const file = await res.blob();
      setImageBlob(file);
    }
  };

  const handleIndexedEntry = async () => {
    await refreshEntries();
    clearStore();
    linkTo('/dashboard/profile');
  };

  useEffect(() => {
    if (indexed) {
      setOpenListener(false);
      handleIndexedEntry();
    }
  }, [indexed]);

  const onCreate = async () => {
    setOpenListener(true);

    const res = await create();
    if (!res) {
      return setUploadingError('Something went wrong. Please try again!');
    }
    let { xdr, submitted, success } = res;

    if (!success) {
      return setUploadingError('Something went very wrong. Please contact us!');
    }

    if (!submitted) {
      let message;
      try {
        message = await signAndSubmitXdr(xdr);
      } catch (e) {
        console.log(e);
      }
      console.log(message);
    }

    return;
  };

  if (uploadingError) {
    return (
      <UploadErrorView
        uploadingError={uploadingError}
        clearUploadingError={() => clearUploadingError()}
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
          value={artist}
          onChangeText={(t) => setArtist(t)}
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
          value={title}
          onChangeText={(t) => setTitle(t)}
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
          value={description}
          onChangeText={(t) => setDescription(t)}
          maxLength={60}
        />
      </View>
      <View style={styles.field}>
        <CircleIcon
          size={10}
          color={
            availableForSale ? Colors.lightBrandBlue : Colors.dividerBackground
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
          onValueChange={(forSale) => setAvailableForSale(forSale)}
          value={availableForSale}
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
      {availableForSale && (
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
              value={price ? price.toString() : ''}
              onChangeText={(price) => setPrice(parseInt(price))}
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
              {equityForSalePercentage}
            </Text>

            <Slider
              style={{ flex: 1 }}
              minimumValue={1}
              maximumValue={100}
              value={equityForSaleValue}
              onValueChange={(target) => {
                setEquityForSale(target);
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
          imageSelected={!!imageBlob}
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
          {'Media file: '}
        </Text>

        <UploadView
          videoSelected={!!videoBlob}
          selectVideo={selectVideo}
          loadingVideo={loadingVideo}
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
          disabled={!canCreate}
          onPress={onCreate}
          text={
            creating
              ? currentUpload === 'video'
                ? `Uploading Files ${progress}%`
                : currentUpload === 'meta'
                ? `Uploading Meta`
                : 'Uploading'
              : 'Mint'
          }
        />
      </View>
    </View>
  );
};

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
