import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DollarIcon from 'app/src/ui/icons/dollar';
import Colors from 'app/src/constants/Colors';
import { Stores } from 'app/src/functions/Stores';
import { A } from '@expo/html-elements';
import { stellarAssetLink } from 'app/src/functions/utils';

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
        href={stellarAssetLink(code, issuer)}
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
