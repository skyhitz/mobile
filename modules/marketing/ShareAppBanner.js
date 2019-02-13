import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
  View,
} from 'react-native';
import Colors from 'app/constants/Colors';
import Divider from 'app/modules/ui/Divider';
import { DangerZone } from 'expo';
let { Branch } = DangerZone;
import LargeBtn from 'app/modules/ui/LargeBtn';
import { navigate } from 'app/modules/navigation/Navigator';

export default class ShareAppBanner extends React.Component {
  componentDidMount() {
    this.createBranchUniversalObject();
  }

  async createBranchUniversalObject() {
    this._branchUniversalObject = await Branch.createBranchUniversalObject(
      `main`,
      {
        title: 'Skyhitz',
        contentImageUrl:
          'https://res.cloudinary.com/skyhitz/image/upload/v1512092610/icon_tbqbun.png',
        contentDescription: 'Connecting friends through music!',
        // This metadata can be used to easily navigate back to this screen
        // when implementing deep linking with `Branch.subscribe`.
        metadata: {
          screen: 'SearchNavigator',
          params: JSON.stringify({ id: 'search' }),
        },
      }
    );
  }

  onShareLinkPress = async () => {
    const shareOptions = {
      messageHeader: 'Skyhitz',
      messageBody: 'Connecting friends through music!',
    };
    await this._branchUniversalObject.showShareSheet(shareOptions);
  };

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
          <Text style={styles.adsText}>Upload your music!</Text>
          <LargeBtn onPress={this.onUpload.bind(this)} text="Upload" />
        </View>
        <Divider />
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
