import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { inject } from 'mobx-react/native';
import { BlurView } from 'expo-blur';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { UserAvatarMedium } from 'app/modules/ui/UserAvatar';

@inject(stores => ({
  user: stores.profileStore.user,
}))
export default class ProfileTopContainer extends React.Component {
  render() {
    if (!this.props.user) {
      return null;
    }
    let source;
    if (this.props.user.avatarUrl) {
      source = { uri: this.props.user.avatarUrl };
    }
    if (source) {
      return (
        <View style={styles.container}>
          <ImageBackground source={source} style={StyleSheet.absoluteFill}>
            {this.renderBlurSection()}
          </ImageBackground>
        </View>
      );
    }
    return <View style={styles.container}>{this.renderBlurSection()}</View>;
  }
  renderBlurSection() {
    return (
      <BlurView blurType="dark" intensity={100} style={StyleSheet.absoluteFill}>
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
      </BlurView>
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
