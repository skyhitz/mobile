import React from 'react';
import { StyleSheet, Text, Linking, View } from 'react-native';
import Colors from 'app/constants/Colors';
import LargeBtn from 'app/modules/ui/LargeBtn';
import { navigate } from 'app/modules/navigation/Navigator';

export default class ShareAppBanner extends React.Component<any, any> {
  onUpload = async () => {
    navigate('UploadMusicModal');
  };

  async openSkyhitzInstagram() {
    let instagramURL = `instagram://user?username=skyhitz`;
    Linking.openURL(instagramURL);
  }

  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.bannerWrap}>
          <Text style={styles.adsText}>Upload your music videos!</Text>
          <LargeBtn onPress={this.onUpload.bind(this)} text="Upload" />
        </View>
      </View>
    );
  }
}

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
    maxHeight: 140,
  },
});
