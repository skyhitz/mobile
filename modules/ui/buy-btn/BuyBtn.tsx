import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import { Stores } from 'skyhitz-common';
import { navigate } from 'app/modules/navigation/Navigator';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Placeholder = () => <View style={styles.placeholder} />;

@inject((stores: Stores) => ({
  buyEntry: stores.paymentsStore.buyEntry.bind(stores.paymentsStore),
  entry: stores.playerStore.entry,
  user: stores.sessionStore.user,
  credits: stores.paymentsStore.credits,
}))
export default class BuyBtn extends React.Component<any, any> {
  showBuyOptionsModal() {
    navigate('BuyOptionsModal', {
      entry: this.props.entry,
    });
  }
  render() {
    if (
      !this.props.entry ||
      !this.props.entry.forSale ||
      !this.props.entry.price
    ) {
      return <Placeholder />;
    }
    return (
      <View style={styles.wrap}>
        <TouchableOpacity
          style={styles.controlTouch}
          onPress={() => this.showBuyOptionsModal()}
        >
          <Text style={styles.creditsText}>
            $ {this.props.entry.price} - Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
