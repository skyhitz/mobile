import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { UserAvatarMedium } from 'app/modules/ui/UserAvatar';
import { MaterialIcons } from '@expo/vector-icons';
import * as stores from 'skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  user: stores.sessionStore.user,
  subscribed: stores.paymentsStore.subscribed,
  credits: stores.paymentsStore.credits,
}))
export default class ProfileSettingsTopContainer extends React.Component<
  any,
  any
> {
  render() {
    if (!this.props.user) {
      return null;
    }
    let source;
    if (this.props.user.avatarUrl) {
      source = { uri: this.props.user.avatarUrl };
    }
    if (this.props.user.bannerUrl) {
      source = { uri: this.props.user.bannerUrl };
    }
    if (source) {
      return <View style={styles.container}>{this.renderBlurSection()}</View>;
    }
    return <View style={styles.container}>{this.renderBlurSection()}</View>;
  }
  renderStar() {
    if (this.props.subscribed) {
      return (
        <MaterialIcons
          name="star-border"
          size={22}
          color={Colors.brandBlue}
          style={styles.starsIcon}
        />
      );
    }
    return null;
  }
  renderBlurSection() {
    return (
      <View style={styles.overlay}>
        <View style={styles.topContainer}>
          <View style={styles.topHeader}>
            {UserAvatarMedium(this.props.user)}
            <View style={styles.profileInfo}>
              <Text style={styles.text}>{this.props.user.displayName}</Text>
              {this.renderStar()}
              <Text style={styles.text}>
                {this.props.credits ? this.props.credits : ''}
              </Text>
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
  starsIcon: {
    backgroundColor: 'transparent',
    marginLeft: 15,
    marginRight: 5,
  },
});
