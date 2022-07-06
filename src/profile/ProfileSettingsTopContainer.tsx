import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from 'app/src/constants/Colors';
import Layout from 'app/src/constants/Layout';
import { UserAvatarMedium } from 'app/src/ui/UserAvatar';
import EditBtn from '../ui/EditBtn';
import DollarIcon from 'app/src/ui/icons/dollar';
import WalletIcon from 'app/src/ui/icons/wallet';
import { A } from '@expo/html-elements';
import { stellarAccountLink } from 'app/src/functions/utils';
import { PaymentsStore } from '../stores/payments.store';
import { userAtom } from '../atoms/atoms';
import { useRecoilValue } from 'recoil';

export default (props) => {
  const { credits, loadingBalance } = PaymentsStore();
  const user = useRecoilValue(userAtom);

  const renderDollarSign = () => {
    if (credits > 0) {
      return (
        <View style={styles.starsIcon}>
          <DollarIcon size={22} color={Colors.white} />
        </View>
      );
    }
    return null;
  };

  const renderCreditsSection = () => {
    if (loadingBalance) {
      return <Text style={styles.text}> {'   '}Loading Balance...</Text>;
    }
    return (
      <>
        {renderDollarSign()}
        <Text style={styles.text}>{credits ? credits.toFixed(4) : ''}</Text>
      </>
    );
  };

  if (!user) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.topContainer}>
          <View style={styles.topHeader}>
            {UserAvatarMedium(user)}
            <View style={styles.headerWrap}>
              <View style={styles.profileInfo}>
                <Text style={styles.text}>{user?.displayName}</Text>
                {renderCreditsSection()}
                <EditBtn customStyles={styles.cogIcon} />
              </View>
              {user.publicKey ? (
                <A
                  target="_blank"
                  href={stellarAccountLink(user.publicKey)}
                  aria-label="View on Stellar Expert"
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignItems: 'center',
                    }}
                  >
                    <WalletIcon size={18} color={Colors.defaultTextLight} />

                    <Text style={styles.textSmall}>{user.publicKey}</Text>
                  </View>
                </A>
              ) : null}
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
