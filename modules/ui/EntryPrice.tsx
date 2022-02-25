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
      : 'pubnet'
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

  return (
    <View style={styles.endSection}>
      {value.price > 0 && <Text style={styles.price}>{value.price}</Text>}
      <A
        target="_blank"
        href={stellarExpertLink(code, issuer)}
        aria-label="View on Stellar Expert"
      >
        <DollarIcon size={12} color={Colors.white} />
      </A>
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
    marginHorizontal: 10,
  },
});

export default EntryPrice;
