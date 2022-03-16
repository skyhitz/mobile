import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DollarIcon from 'app/modules/ui/icons/dollar';
import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';
import { A } from '@expo/html-elements';
import { Config } from 'app/skyhitz-common/src/config';

const stellarExpertLink = (code: string, issuer: string) =>
  `https://stellar.expert/explorer/${
    Config.HORIZON_URL === "'https://horizon-testnet.stellar.org'"
      ? 'testnet'
      : 'public'
  }/asset/${code}-${issuer}`;

function EntryPrice({ code, issuer }) {
  const [value, setValue] = useState({ price: 0, amount: 0 });
  const { paymentsStore } = Stores();

  const handleFetchPrice = async () => {
    setValue(await paymentsStore.fetchAndCachePrice(code, issuer));
  };

  useEffect(() => {
    if (code && issuer) {
      handleFetchPrice();
    }
  }, []);

  const getAvailablePrice = () => {
    return (value.amount * value.price).toFixed(0);
  };

  return (
    <View style={styles.endSection}>
      <A
        target="_blank"
        href={stellarExpertLink(code, issuer)}
        aria-label="View on Stellar Expert"
      >
        <DollarIcon size={10} color={Colors.white} />
      </A>
      {value.price > 0 && (
        <Text style={styles.price}>{getAvailablePrice()}</Text>
      )}
    </View>
  );
}

let styles = StyleSheet.create({
  endSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.white,
  },
  price: {
    color: Colors.white,
    marginHorizontal: 5,
  },
});

export default EntryPrice;
