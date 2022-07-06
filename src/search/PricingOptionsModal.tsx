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
import Colors from 'app/src/constants/Colors';
import cursorPointer from 'app/src/constants/CursorPointer';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import DollarIcon from 'app/src/ui/icons/dollar';
import PieIcon from 'app/src/ui/icons/pie';
import CircleIcon from 'app/src/ui/icons/circle';
import { UserEntriesStore } from '../stores/user-entries';
import { EntryStore } from '../stores/entry.store';

const SwitchWeb: any = Switch;

export default ({ route }) => {
  const {
    equityForSale,
    setAvailableForSale,
    setPrice,
    setEquityForSale,
    equityForSalePercentage,
    availableForSale,
    price,
  } = EntryStore();
  const { refreshEntries } = UserEntriesStore();
  const { goBack } = useNavigation();
  const { entry } = route.params;
  let equityForSaleValue = equityForSale ? equityForSale : 0;

  useEffect(() => {
    if (!entry) return;
    setAvailableForSale(entry.forSale);
    if (entry.price) {
      setPrice(entry.price);
    }
  }, []);

  const handleUpdatePricing = async (entry: any) => {
    await setPrice(entry);
    refreshEntries();
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
        <CircleIcon
          size={10}
          color={
            availableForSale ? Colors.lightBrandBlue : Colors.dividerBackground
          }
        />
        <Text
          style={styles.priceDescription}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {'Available for Sale: '}
        </Text>
        <SwitchWeb
          onValueChange={(forSale) => setAvailableForSale(forSale)}
          value={availableForSale}
          style={styles.switch}
          activeThumbColor={Colors.defaultTextLight}
          trackColor={{
            false: Colors.defaultTextLight,
            true: Colors.lightBrandBlue,
          }}
          thumbColor={Colors.defaultTextLight}
        />
      </View>
      <View style={styles.field}>
        <DollarIcon size={20} color={Colors.dividerBackground} />
        <Text
          style={styles.priceDescription}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {'Price (XLM): '}
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
          value={price ? String(price) : undefined}
          onChangeText={(price) => setPrice(parseInt(price))}
          maxLength={30}
        />
      </View>
      <View style={styles.field}>
        <PieIcon size={24} color={Colors.dividerBackground} />
        <Text
          style={styles.equityDescription}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {'Equity for Sale: '}
          {equityForSalePercentage}
        </Text>

        <Slider
          style={{ flex: 1, marginLeft: 10 }}
          minimumValue={1}
          maximumValue={100}
          value={equityForSaleValue}
          onValueChange={(target) => {
            setEquityForSale(target);
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
};

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
    width: '100%',
    maxWidth: 400,
  },
  artistName: {
    fontSize: 16,
    textAlign: 'left',
    marginTop: 10,
    color: Colors.white,
    width: '100%',
    maxWidth: 400,
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
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 30,
  },
  priceDescription: {
    color: Colors.defaultTextLight,
    fontSize: 16,
    paddingLeft: 15,
  },
  equityDescription: {
    color: Colors.defaultTextLight,
    fontSize: 16,
    paddingLeft: 15,
    width: 180,
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
    width: '100%',
    maxWidth: 400,
  },
  placeholderIcon: {
    backgroundColor: Colors.transparent,
  },
  input: {
    backgroundColor: Colors.transparent,
    color: Colors.defaultTextLight,
    fontSize: 14,
    paddingLeft: 15,
  },
  switch: {
    backgroundColor: Colors.transparent,
    color: Colors.defaultTextLight,
    fontSize: 14,
    marginLeft: 10,
  },
});
