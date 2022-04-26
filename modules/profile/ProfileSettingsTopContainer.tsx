import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { UserAvatarMedium } from 'app/modules/ui/UserAvatar';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';
import EditBtn from '../ui/EditBtn';
import DollarIcon from 'app/modules/ui/icons/dollar';
import KeyIcon from 'app/modules/ui/icons/key';
import { Config } from 'app/skyhitz-common/src/config';
import { A } from '@expo/html-elements';

const stellarExpertLink = (publicKey: string) =>
  `https://stellar.expert/explorer/${
    Config.HORIZON_URL === "'https://horizon-testnet.stellar.org'"
      ? 'testnet'
      : 'public'
  }/account/${publicKey}`;

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
          {paymentsStore.credits ? paymentsStore.credits.toFixed(4) : ''}
        </Text>
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
            <View style={styles.headerWrap}>
              <View style={styles.profileInfo}>
                <Text style={styles.text}>
                  {sessionStore.user?.displayName}
                </Text>
                {renderCreditsSection()}
                <EditBtn customStyles={styles.cogIcon} />
              </View>
              {sessionStore.user.publicKey ? (
                <A
                  target="_blank"
                  href={stellarExpertLink(sessionStore.user.publicKey)}
                  aria-label="View on Stellar Expert"
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignItems: 'center',
                    }}
                  >
                    <KeyIcon size={18} color={Colors.defaultTextLight} />

                    <Text style={styles.textSmall}>
                      {sessionStore.user.publicKey}
                    </Text>
                  </View>
                </A>
              ) : null}
            </View>
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
  headerWrap: {
    marginLeft: 10,
    marginRight: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    color: 'white',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSmall: {
    color: 'white',
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  cogIcon: {
    marginLeft: 10,
  },
  starsIcon: {
    backgroundColor: 'transparent',
    marginLeft: 15,
    marginRight: 1,
    paddingRight: 10,
  },
});
