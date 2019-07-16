import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { inject } from 'mobx-react';
import { BlurView } from 'expo-blur';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { UserAvatarMedium } from 'app/modules/ui/UserAvatar';
import { Stores } from 'skyhitz-common';

@inject((stores: Stores) => ({
  user: stores.profileStore.user,
}))
export default class ProfileTopContainer extends React.Component<any, any> {
  render() {
    if (!this.props.user) {
      return null;
    }
    let source;
    if (this.props.user.avatarUrl) {
      source = { uri: this.props.user.avatarUrl };
    }
    if (source) {
      return <View style={styles.container}>{this.renderBlurSection()}</View>;
    }
    return <View style={styles.container}>{this.renderBlurSection()}</View>;
  }
  renderBlurSection() {
    return (
      <View style={styles.overlay}>
        <View style={styles.topContainer}>
          <View style={styles.topHeader}>
            {UserAvatarMedium(this.props.user)}
            <View style={styles.profileInfo}>
              <Text style={styles.text}>{this.props.user.displayName}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: Layout.window.width,
    height: 100,
  },
  overlay: {
    backgroundColor: Colors.profileOverlayBackground,
    flex: 1,
    justifyContent: 'center',
  },
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    flex: 1,
    height: 75,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    color: 'white',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
