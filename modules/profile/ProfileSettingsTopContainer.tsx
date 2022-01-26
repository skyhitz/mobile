import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { UserAvatarMedium } from 'app/modules/ui/UserAvatar';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';
import EditBtn from '../ui/EditBtn';
import DollarIcon from 'app/modules/ui/icons/dollar';

export default observer((props) => {
  const { paymentsStore, sessionStore } = Stores();

  const renderDollarSign = () => {
    if (paymentsStore.credits > 0) {
      return (
        <View style={styles.starsIcon}>
          <DollarIcon size={22} color={Colors.white} />
        </View>
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

  if (!sessionStore.user) {
    return null;
  }
  return (
    <View style={styles.container}>
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
    </View>
  );
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
