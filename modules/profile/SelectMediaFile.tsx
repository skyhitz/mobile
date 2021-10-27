import React, { useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Switch,
  Platform,
  Alert,
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

const SwitchWeb: any = Switch;

const CircleWrap = (props) => (
  <View
    style={[
      styles.imageLoader,
      styles.activityIndicatorOffset,
      { backgroundColor: Colors.overlayBackground },
    ]}
  >
    {props.children}
  </View>
);

const UploadView = ({ uploadingVideo, progress, selectVideo }) => {
  if (uploadingVideo) {
    return (
      <CircleWrap>
        <Text style={{ color: Colors.white, fontSize: progress ? 32 : 14 }}>
          {progress ? progress + ' %' : 'Uploading'}
        </Text>
      </CircleWrap>
    );
  }
  return (
    <Pressable style={cursorPointer} onPress={selectVideo}>
      <CircleWrap>
        <Text style={{ color: Colors.white }}>Select Video</Text>
      </CircleWrap>
    </Pressable>
  );
};

const UploadViewWrap = ({ uploadingVideo, progress, selectVideo }) => (
  <View style={styles.wrap}>
    <UploadView
      uploadingVideo={uploadingVideo}
      progress={progress}
      selectVideo={selectVideo}
    />
    <Text style={{ color: Colors.white, marginLeft: 20, marginRight: 20 }}>
      Only original video music related material will be uploaded. We take
      copyright law very seriously. Maximum file size allowed: 50MB
    </Text>
  </View>
);

const UploadErrorView = ({ uploadingError }) => (
  <View style={styles.wrap}>
    <Text style={{ color: Colors.white, marginLeft: 20, marginRight: 20 }}>
      {uploadingError}
    </Text>
  </View>
);

const ArtworkSection = ({ loadingArtwork, artworkUrl, selectArtwork }) => {
  if (loadingArtwork) {
    return (
      <CircleWrap>
        <Text style={{ color: Colors.white }}>Uploading...</Text>
      </CircleWrap>
    );
  }
  if (!artworkUrl) {
    return (
      <Pressable style={cursorPointer} onPress={selectArtwork}>
        <CircleWrap>
          <Text style={{ color: Colors.white }}>Select Artwork</Text>
        </CircleWrap>
      </Pressable>
    );
  }
  return <Image source={{ uri: artworkUrl }} style={styles.imageLoader} />;
};

export default observer(() => {
  const { entryStore, userEntriesStore } = Stores();
  const linkTo = useLinkTo();
  let equityForSaleValue = entryStore.equityForSale
    ? entryStore.equityForSale
    : 0;

  const getPermissionAsync = async () => {
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
    }

    if (video && !video.cancelled) {
      await entryStore.uploadVideo(video);
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
      await entryStore.uploadArtwork(image);
    }
  };

  const onCreate = async () => {
    await entryStore.create();
    await userEntriesStore.refreshEntries();
    entryStore.clearStore();
    linkTo('/profile');
  };

  if (entryStore.uploadingError) {
    return <UploadErrorView uploadingError={entryStore.uploadingError} />;
  }

  if (entryStore.currentView == 'upload') {
    return (
      <UploadViewWrap
        selectVideo={selectVideo}
        progress={entryStore.progress}
        uploadingVideo={entryStore.uploadingVideo}
      />
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.inputContainerTop}>
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
        {entryStore.availableForSale ? (
          <>
            <View style={styles.field}>
              <DollarIcon size={20} color={Colors.dividerBackground} />

              <Text
                style={styles.priceUSDDescription}
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
                style={[
                  styles.priceInput,
                  Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
                ]}
                placeholderTextColor="white"
                value={entryStore.price ? entryStore.price.toString() : ''}
                onChangeText={(price) =>
                  entryStore.updatePrice(parseInt(price))
                }
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
        ) : (
          <View style={styles.emptyField}></View>
        )}
      </View>
      <ArtworkSection
        loadingArtwork={entryStore.loadingArtwork}
        artworkUrl={entryStore.artworkUrl}
        selectArtwork={selectArtwork}
      />
      <View style={styles.btn}>
        <LargeBtn
          disabled={!entryStore.canCreate}
          onPress={onCreate}
          text={entryStore.creating ? 'Creating...' : 'Done'}
        />
      </View>
    </View>
  );
});

const circleSize = 120;
const circleBorderRadius = circleSize / 2;

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  btn: {
    marginTop: 30,
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
    minWidth: 367,
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
    fontSize: 14,
    paddingLeft: 10,
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
    maxHeight: 250,
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
    width: 110,
  },
});
