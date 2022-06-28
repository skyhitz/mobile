import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Colors from 'app/src/constants/Colors';
import LargeBtn from 'app/src/ui/LargeBtn';
import { useLinkTo } from '@react-navigation/native';
import UploadIcon from 'app/src/ui/icons/upload';
import DollarIcon from 'app/src/ui/icons/dollar';

export default ({ credits }) => {
  const linkTo = useLinkTo();

  const onUpload = async () => {
    if (credits < 2) {
      return linkTo('/low-balance');
    }
    linkTo('/dashboard/profile/mint-nft');
  };

  const onBuyCredits = async () => {
    linkTo('/payment');
  };

  return (
    <View style={styles.wrap}>
      {Platform.OS === 'web' ? (
        <View style={styles.bannerWrap}>
          <LargeBtn
            icon={() => <DollarIcon size={20} color={Colors.white} />}
            onPress={onBuyCredits}
            text="Buy XLM"
          />
        </View>
      ) : null}
      <View style={styles.bannerWrap}>
        <LargeBtn
          icon={() => <UploadIcon size={20} color={Colors.white} />}
          onPress={onUpload}
          text="Mint New NFT"
        />
      </View>
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bannerWrap: {
    backgroundColor: Colors.listItemBackground,
    maxHeight: 120,
    paddingVertical: 30,
  },
});
