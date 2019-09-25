import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { inject } from 'mobx-react';
import { Entypo } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import { Stores } from 'skyhitz-common';

const Placeholder = () => <View style={styles.controlTouch} />;

@inject((stores: Stores) => ({
  buyEntry: stores.paymentsStore.buyEntry.bind(stores.paymentsStore),
  entry: stores.playerStore.entry,
  user: stores.sessionStore.user,
  credits: stores.paymentsStore.credits,
}))
export default class BuyBtn extends React.Component<any, any> {
  render() {
    if (
      !this.props.entry ||
      this.props.entry.userUsername === this.props.user.username
    ) {
      return <Placeholder />;
    }
    return (
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={() => this.props.buyEntry(this.props.entry)}
      >
        <Entypo
          style={styles.priceTag}
          name="price-tag"
          size={28}
          color={Colors.dividerBackground}
        />
        <Text style={styles.creditsText}>
          $ {this.props.entry.price} - Buy Now
        </Text>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  controlTouch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  creditsText: {
    color: 'white',
    marginLeft: 10,
  },
  priceTag: {
    paddingTop: 15,
  },
});
