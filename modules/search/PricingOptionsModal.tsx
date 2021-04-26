import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Switch,
  Platform,
} from 'react-native';
import { observer } from 'mobx-react';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons';
import cursorPointer from 'app/constants/CursorPointer';
import { Stores } from 'app/functions/Stores';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

export default observer(({ route }) => {
  const { entryStore, userEntriesStore } = Stores();
  const { goBack } = useNavigation();
  const { entry } = route.params;

  useEffect(() => {
    if (!entry) return;
    entryStore.updateAvailableForSale(entry.forSale);
    if (entry.price) {
      entryStore.updatePrice(entry.price);
    }
  }, []);

  const handleUpdatePricing = async (entry: any) => {
    await entryStore.updatePricing(entry);
    userEntriesStore.refreshEntries();
    goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
          {`Title:       ${entry.title}`}
        </Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.artistName} ellipsizeMode="tail" numberOfLines={1}>
          {`Owner:   ${entry.artist}`}
        </Text>
      </View>
      <View style={styles.field}>
        <MaterialCommunityIcons
          name="circle-medium"
          size={24}
          color={
            entryStore.availableForSale
              ? Colors.lightBrandBlue
              : Colors.dividerBackground
          }
          style={styles.placeholderIcon}
        />
        <Text
          style={styles.priceDescription}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {'Available for Sale: '}
        </Text>
        <Switch
          onValueChange={(forSale) =>
            entryStore.updateAvailableForSale(forSale)
          }
          value={entryStore.availableForSale}
          style={styles.input}
          trackColor={{
            false: Colors.defaultTextLight,
            true: Colors.lightBrandBlue,
          }}
          thumbColor={Colors.lightGrey}
        />
      </View>
      <View style={styles.field}>
        <MaterialIcons
          name={'attach-money'}
          size={20}
          color={Colors.dividerBackground}
          style={styles.placeholderIcon}
        />
        <Text
          style={styles.priceDescription}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {'Price USD: '}
        </Text>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          placeholder=""
          keyboardType={'numeric'}
          autoCorrect={false}
          autoFocus={true}
          style={[
            styles.input,
            Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
          ]}
          placeholderTextColor="white"
          value={entryStore.price ? String(entryStore.price) : undefined}
          onChangeText={(price) => entryStore.updatePrice(parseInt(price))}
          maxLength={30}
        />
      </View>
      <View style={styles.field}>
        <FontAwesome
          name="pie-chart"
          size={24}
          color={Colors.dividerBackground}
          style={styles.placeholderIcon}
        />
        <Text
          style={styles.priceDescription}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {'Equity for Sale: '}
          {entryStore.equityForSalePercentage}
        </Text>

        <Slider
          style={{ flex: 1 }}
          minimumValue={1}
          maximumValue={100}
          value={entryStore.equityForSaleValue}
          onValueChange={(target) => {
            entryStore.updateEquityForSalePercentage(target);
          }}
          step={1}
          minimumTrackTintColor={Colors.brandBlue}
          maximumTrackTintColor={Colors.backgroundTrackColor}
          thumbTintColor={Colors.brandBlue}
        />
      </View>

      <View style={styles.bottomWrap}>
        <Pressable onPress={() => handleUpdatePricing(entry)}>
          <Text style={[styles.btnText, cursorPointer]}>Done</Text>
        </Pressable>
        <Pressable onPress={() => goBack()}>
          <Text style={[styles.btnText, cursorPointer]}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: 80,
  },
  thumb: {
    width: 224,
    height: 168,
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    color: Colors.white,
    marginTop: 40,
    width: Layout.window.width,
  },
  artistName: {
    fontSize: 16,
    textAlign: 'left',
    marginTop: 10,
    color: Colors.white,
    width: Layout.window.width,
  },
  options: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-around',
    maxHeight: 150,
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    width: Layout.window.width,
    paddingHorizontal: 30,
  },
  priceDescription: {
    color: Colors.defaultTextLight,
    fontSize: 16,
    paddingLeft: 36,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    color: Colors.white,
    paddingLeft: 10,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
    height: 50,
    lineHeight: 50,
    minWidth: 150,
    backgroundColor: Colors.lightBlueBtn,
    borderRadius: 4,
  },
  bottomWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 100,
    maxHeight: 100,
    width: Layout.window.width,
  },
  placeholderIcon: {
    backgroundColor: Colors.transparent,
  },
  input: {
    backgroundColor: Colors.transparent,
    color: Colors.defaultTextLight,
    fontSize: 14,
    paddingLeft: 36,
  },
});
