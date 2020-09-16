import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Colors from 'app/constants/Colors';
import LargeBtn from 'app/modules/ui/LargeBtn';
import { useNavigation } from '@react-navigation/native';

export default (props) => {
  let { navigate } = useNavigation();
  const onUpload = async () => {
    navigate('UploadMusicModal');
  };

  const onBuyCredits = async () => {
    navigate('PaymentModal');
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.bannerWrap}>
        <LargeBtn iconName="upload" onPress={onUpload} text="Upload Beat" />
      </View>

      {Platform.OS === 'web' ? (
        <View style={styles.bannerWrap}>
          <LargeBtn
            iconName="dollar-sign"
            onPress={onBuyCredits}
            text="Buy Credits"
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  adsText: {
    color: Colors.defaultTextDark,
    fontSize: 14,
    paddingBottom: 20,
  },
  wrap: {
    flex: 1,
  },
  bannerWrap: {
    flex: 1,
    backgroundColor: Colors.listItemBackground,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 120,
  },
});
