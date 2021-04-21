import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import LargeBtn from './LargeBtn';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';
import { useNavigation } from '@react-navigation/core';

export default observer(({ route }) => {
  const router = useNavigation();
  const { entry } = route.params;
  const { goBack } = useNavigation();

  const {
    paymentsStore,
    userEntriesStore,
    entriesSearchStore,
    playerStore,
  } = Stores();

  const buyEntry = async (id: string) => {
    await paymentsStore.buyEntry(id);
    [
      await userEntriesStore.refreshEntries(),
      await entriesSearchStore.getRecentSearches(),
      await paymentsStore.refreshSubscription(),
    ];
    playerStore.refreshEntry();

    goBack();
  };

  if (!paymentsStore.credits || paymentsStore.credits < entry.price) {
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
        <LargeBtn text="Confirm" onPress={() => buyEntry(entry.id)} />
      </View>
    </View>
  );
});

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
