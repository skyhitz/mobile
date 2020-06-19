import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from 'app/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Stores } from 'app/functions/Stores';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';

const Placeholder = () => <View style={styles.placeholder} />;

export default observer(() => {
  const { playerStore } = Stores();
  const { navigate } = useNavigation();
  const showBuyOptionsModal = () => {
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
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={showBuyOptionsModal}
      >
        <Text style={styles.creditsText}>
          $ {playerStore.entry.price} - Buy Now
        </Text>
      </TouchableOpacity>
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
    paddingTop: 8,
    height: 40,
    marginBottom: 20,
  },
  controlTouch: {
    backgroundColor: Colors.brandBlue,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    height: 40,
    marginBottom: 20,
  },
  creditsText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceTag: {
    paddingTop: 15,
  },
});
