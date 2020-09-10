import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { Stores } from 'skyhitz-common';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

@inject((stores: Stores) => ({
  user: stores.sessionStore.user,
  updateAvailableForSale: stores.entryStore.updateAvailableForSale.bind(
    stores.entryStore
  ),
  updatePrice: stores.entryStore.updatePrice.bind(stores.entryStore),
  availableForSale: stores.entryStore.availableForSale,
  price: stores.entryStore.price,
  updatePricing: stores.entryStore.updatePricing.bind(stores.entryStore),
  refreshEntries: stores.userEntriesStore.refreshEntries.bind(
    stores.userEntriesStore
  ),
}))
export default class PricingOptionsModal extends React.Component<any, any> {
  componentDidMount() {
    const { entry } = this.props.navigation.state.params;
    if (!entry) return;
    this.props.updateAvailableForSale(entry.forSale);
    if (entry.price) {
      this.props.updatePrice(entry.price.toString());
    }
  }
  async handleUpdatePricing(entry: any) {
    await this.props.updatePricing(entry);
    this.props.refreshEntries();
    this.props.navigation.goBack();
  }
  render() {
    const { entry } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={styles.field}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {`Title:       ${entry.title}`}
          </Text>
        </View>
        <View style={styles.field}>
          <Text
            style={styles.artistName}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {`Owner:   ${entry.artist}`}
          </Text>
        </View>
        <View style={styles.field}>
          <MaterialCommunityIcons
            name="circle-medium"
            size={24}
            color={
              this.props.availableForSale
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
              this.props.updateAvailableForSale(forSale)
            }
            value={this.props.availableForSale}
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
            style={styles.input}
            placeholderTextColor="white"
            value={this.props.price ? String(this.props.price) : undefined}
            onChangeText={(price) => this.props.updatePrice(price)}
            maxLength={30}
          />
        </View>

        <View style={styles.bottomWrap}>
          <TouchableOpacity onPress={() => this.handleUpdatePricing(entry)}>
            <Text style={styles.btnText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
