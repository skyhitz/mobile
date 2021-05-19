import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { UserAvatarMedium } from 'app/modules/ui/UserAvatar';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';

export default observer((props) => {
  const { profileStore } = Stores();

  const renderBlurSection = () => {
    return (
      <View style={styles.overlay}>
        <View style={styles.topContainer}>
          <View style={styles.topHeader}>
            {UserAvatarMedium(profileStore.user)}
            <View style={styles.profileInfo}>
              <Text style={styles.text}>{profileStore.user.displayName}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (!profileStore.user) {
    return null;
  }
  let source;
  if (profileStore.user.avatarUrl) {
    source = { uri: profileStore.user.avatarUrl };
  }
  if (source) {
    return <View style={styles.container}>{renderBlurSection()}</View>;
  }
  return <View style={styles.container}>{renderBlurSection()}</View>;
});

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
