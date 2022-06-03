import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import cursorPointer from 'app/constants/CursorPointer';
import DollarIcon from 'app/modules/ui/icons/dollar';
import tw from 'twin.macro';

const Placeholder = () => <View style={styles.placeholder} />;

export default observer(({ entry }) => {
  const { paymentsStore } = Stores();
  const { dispatch } = useNavigation();

  const [priceInfo, setPriceInfo] = useState({
    price: entry && entry.price ? entry.price : 0,
    amount: 100,
  });

  const showBuyOptionsModal = () => {
    dispatch(
      CommonActions.navigate({
        name: 'BuyOptionsModal',
        params: {
          entry: entry,
          priceInfo: priceInfo,
        },
      })
    );
  };

  const getPriceInfo = async () => {
    const { price, amount } = await paymentsStore.fetchAndCachePrice(
      entry.code,
      entry.issuer
    );
    setPriceInfo({ price: price.toFixed(0), amount });
  };

  useEffect(() => {
    if (entry && entry.id) {
      getPriceInfo();
      paymentsStore.refreshSubscription();
    }
  }, [entry]);

  if (!entry || !priceInfo.price || priceInfo.price == 0) {
    return <Placeholder />;
  }
  return (
    <View style={styles.wrap}>
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={showBuyOptionsModal}
      >
        <View style={styles.wrap}>
          <DollarIcon size={10} color={Colors.white} />
          <Text style={tw`px-2 text-white font-medium`}>
            {(priceInfo.price * priceInfo.amount).toFixed(0)} - Buy Now
          </Text>
        </View>
      </Pressable>
    </View>
  );
});

var styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    height: 40,
    marginBottom: 10,
  },
  controlTouch: {
    backgroundColor: Colors.brandBlue,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 30,
    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
