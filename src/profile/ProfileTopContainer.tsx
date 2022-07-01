import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from 'app/src/constants/Colors';
import { UserAvatarMedium } from 'app/src/ui/UserAvatar';
import ProfileStore from '../stores/profile';

export default (props) => {
  const { user } = ProfileStore();

  if (!user) {
    return null;
  }
  let source;
  if (user.avatarUrl) {
    source = { uri: user.avatarUrl };
  }
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.topContainer}>
          <View style={styles.topHeader}>
            {UserAvatarMedium(user)}
            <View style={styles.profileInfo}>
              <Text style={styles.text}>{user.displayName}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
