import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DollarIcon from 'app/modules/ui/icons/dollar';
import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';

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
      <Text style={styles.price}>{value.price}</Text>
      <DollarIcon size={12} color={Colors.white} />
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
