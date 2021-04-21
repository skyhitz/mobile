import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Colors from 'app/constants/Colors';
import { Stores } from 'app/functions/Stores';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import cursorPointer from 'app/constants/CursorPointer';

const Placeholder = () => <View style={styles.placeholder} />;

export default observer(() => {
  const { playerStore, paymentsStore } = Stores();
  const { navigate } = useNavigation();
  const showBuyOptionsModal = () => {
    paymentsStore.refreshSubscription();
    navigate('BuyOptionsModal', {
      entry: playerStore.entry,
    });
  };
  if (
    !playerStore.entry ||
    !playerStore.entry.forSale ||
    !playerStore.entry.price
  ) {
    return <Placeholder />;
  }
  return (
    <View style={styles.wrap}>
      <Pressable
        style={[styles.controlTouch, cursorPointer]}
        onPress={showBuyOptionsModal}
      >
        <Text style={styles.creditsText}>
          ${playerStore.entry.price} - Buy Now
        </Text>
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
  creditsText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 14,
    fontWeight: 'bold',
  },
  priceTag: {
    paddingTop: 15,
  },
});
