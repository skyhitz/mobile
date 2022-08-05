import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Colors from 'app/src/constants/Colors';
import LargeBtn from './LargeBtn';
import { useNavigation } from '@react-navigation/core';
import { useLinkTo } from '@react-navigation/native';
import { UserEntriesStore } from '../stores/user-entries';
import { PaymentsStore } from '../stores/payments';
import { WalletConnectStore } from '../stores/wallet-connect';
import { PlayerStore } from '../stores/player';

export default ({ route }) => {
  const { entry, priceInfo } = route.params;
  const [submitting, setSubmitting] = useState(false);
  const [
    mustSignAndSubmitWithWalletConnect,
    setMustSignAndSubmitWithWalletConnect,
  ] = useState(false);
  const { goBack } = useNavigation();
  const linkTo = useLinkTo();

  const { refreshEntry } = PlayerStore();
  const { signAndSubmitXdr } = WalletConnectStore();
  const { buyEntry, refreshSubscription, credits } = PaymentsStore();
  const { refreshEntries } = UserEntriesStore();

  const handleBuyEntry = async (id: string) => {
    setSubmitting(true);
    let { xdr, success, submitted } = await buyEntry(
      id,
      priceInfo.amount,
      priceInfo.price
    );

    if (xdr && success) {
      if (!submitted) {
        setMustSignAndSubmitWithWalletConnect(true);
        await signAndSubmitXdr(xdr);
      }
      await Promise.all([await refreshEntries(), await refreshSubscription()]);
      refreshEntry();
      setSubmitting(false);
      goBack();
      linkTo('/dashboard/profile');
      return;
    }
  };

  if (!credits || credits < entry.price) {
    return (
      <View style={styles.container}>
        <View style={styles.infoWrap}>
          <Text style={styles.title}>
            You don't have enough credits to buy this creation.
          </Text>
        </View>
        <View style={styles.bottomWrap}>
          <LargeBtn text="Done" secondary={true} onPress={() => goBack()} />
        </View>
      </View>
    );
  }
  if (submitting) {
    return (
      <View style={styles.container}>
        <View style={styles.infoWrap}>
          <Text style={styles.title}>
            {mustSignAndSubmitWithWalletConnect
              ? 'Please sign and submit via WalletConnect'
              : 'Submitting transaction...'}
          </Text>
        </View>
        <View style={styles.bottomWrap}>
          <ActivityIndicator color={Colors.defaultTextLight} size={'small'} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.infoWrap}>
        <Text style={styles.title}>
          You are about to buy {priceInfo.amount * 100}% equity for{' '}
          {priceInfo.price * priceInfo.amount} XLM of:
        </Text>
        <Text style={styles.title}>{entry.title}</Text>
      </View>
      <View style={styles.bottomWrap}>
        <LargeBtn text="Cancel" secondary={true} onPress={() => goBack()} />
        <LargeBtn text="Confirm" onPress={() => handleBuyEntry(entry.id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlueTransparent,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  infoWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxHeight: 260,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 40,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
  },
  bottomWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    maxHeight: 150,
  },
});
