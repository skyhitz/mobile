import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import { goBack } from 'app/modules/navigation/Navigator';
import LargeBtn from './LargeBtn';
import { inject } from 'mobx-react';
import { Stores } from 'skyhitz-common';

@inject((stores: Stores) => ({
  buyEntry: stores.paymentsStore.buyEntry.bind(stores.paymentsStore),
  credits: stores.paymentsStore.credits,
  refreshEntries: stores.userEntriesStore.refreshEntries.bind(
    stores.userEntriesStore
  ),
  refreshRecentSearches: stores.entriesSearchStore.getRecentSearches.bind(
    stores.entriesSearchStore
  ),
  refreshSubscription: stores.paymentsStore.refreshSubscription.bind(
    stores.paymentsStore
  ),
  entry: stores.playerStore.entry,
}))
export default class BuyOptionsModal extends React.Component<any, any> {
  async buyEntry(id: string) {
    await this.props.buyEntry(id);
    [
      await this.props.refreshEntries(),
      await this.props.refreshRecentSearches(),
      await this.props.refreshSubscription(),
    ];
    this.props.entry.forSale = false;

    goBack();
  }
  render() {
    const { entry } = this.props.navigation.state.params;

    if (!this.props.credits || this.props.credits < entry.price) {
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
    return (
      <View style={styles.container}>
        <View style={styles.infoWrap}>
          <Text style={styles.title}>
            You are about to purchase all the rights of the following creation:{' '}
          </Text>
          <Text style={styles.title}>{entry.title}</Text>
        </View>
        <View style={styles.bottomWrap}>
          <LargeBtn text="Cancel" secondary={true} onPress={() => goBack()} />
          <LargeBtn text="Confirm" onPress={() => this.buyEntry(entry.id)} />
        </View>
      </View>
    );
  }
}

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
