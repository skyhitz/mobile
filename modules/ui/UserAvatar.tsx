import React from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import Colors from 'app/constants/Colors';

export class UserAvatar extends React.Component<any, any> {
  state = {
    fallbackToInitials: false,
  };

  loadFallback() {
    this.setState({ fallbackToInitials: true });
  }

  render() {
    if (!this.props.user) {
      return null;
    }
    if (this.props.user.avatarUrl && !this.state.fallbackToInitials) {
      return (
        <Image
          source={{ uri: this.props.user.avatarUrl }}
          style={styles.thumb}
          onError={() => this.loadFallback()}
        />
      );
    }
    return (
      <View style={[styles.thumb, { backgroundColor: Colors.lightBlueBtn }]}>
        <Text style={styles.userAvatarText}>{this.props.user.initials}</Text>
      </View>
    );
  }
}

export const UserAvatarMedium = user => {
  if (!user) {
    return null;
  }
  if (user.avatarUrl) {
    return <Image source={{ uri: user.avatarUrl }} style={styles.profilepic} />;
  }
  return (
    <View style={[styles.profilepic, { backgroundColor: Colors.lightBlueBtn }]}>
      <Text style={styles.userAvatarTextMedium}>{user.initials}</Text>
    </View>
  );
};

export const UserAvatarMediumWithUrlOnly = url => (
  <Image source={{ uri: url }} style={styles.profilepic} />
);

export const LoadingUserAvatar = () => {
  return (
    <View
      style={[
        styles.profilepic,
        styles.activityIndicatorOffset,
        { backgroundColor: Colors.overlayBackground },
      ]}
    >
      <ActivityIndicator color={Colors.white} size={'large'} />
    </View>
  );
};

let styles = StyleSheet.create({
  userAvatarText: {
    textAlign: 'center',
    paddingTop: 7,
    fontSize: 12,
  },
  userAvatarTextMedium: {
    textAlign: 'center',
    fontSize: 18,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  profilepic: {
    borderRadius: 75 / 2,
    width: 75,
    height: 75,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorOffset: {
    paddingTop: 2,
    paddingLeft: 3,
  },
});
