import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { UserAvatarMedium } from 'app/modules/ui/UserAvatar';
import { MaterialIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';
import EditBtn from '../ui/EditBtn';

export default observer((props) => {
  const { paymentsStore, sessionStore } = Stores();

  const renderDollarSign = () => {
    if (paymentsStore.credits > 0) {
      return (
        <MaterialIcons
          size={22}
          style={styles.starsIcon}
          name={'attach-money'}
          color={Colors.white}
        />
      );
    }
    return null;
  };

  const renderCreditsSection = () => {
    if (paymentsStore.loadingBalance) {
      return <Text style={styles.text}> {'   '}Loading Balance...</Text>;
    }
    return (
      <>
        {renderDollarSign()}
        <Text style={styles.text}>
          {paymentsStore.credits ? paymentsStore.credits : ''}
        </Text>{' '}
      </>
    );
  };

  const renderBlurSection = () => {
    return (
      <View style={styles.overlay}>
        <View style={styles.topContainer}>
          <View style={styles.topHeader}>
            {UserAvatarMedium(sessionStore.user)}
            <View style={styles.profileInfo}>
              <Text style={styles.text}>{sessionStore.user?.displayName}</Text>
              {renderCreditsSection()}
            </View>
            <EditBtn />
          </View>
        </View>
      </View>
    );
  };

  if (!sessionStore.user) {
    return null;
  }
  let source;
  if (sessionStore.user.avatarUrl) {
    source = { uri: sessionStore.user.avatarUrl };
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
    justifyContent: 'flex-start',
    paddingLeft: 5,
  },
  profileInfo: {
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 30,
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
    marginRight: 1,
  },
});
