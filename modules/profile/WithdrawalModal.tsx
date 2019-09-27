import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { goBack } from 'app/modules/navigation/Navigator';
import LargeBtn from 'app/modules/ui/LargeBtn';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores:Stores) => ({
  withdrawToExternalWallet: stores.paymentsStore.withdrawToExternalWallet.bind(
    stores.paymentsStore
  ),
  submittingWithdraw: stores.paymentsStore.submittingWithdraw,
  credits: stores.paymentsStore.credits,
}))
export default class WithdrawalModal extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      withdrawAddress: null,
      creditsToWithdraw: null,
    };
  }
  updateWithdrawAddress(withdrawAddress: string) {
    this.setState({
      withdrawAddress: withdrawAddress,
    });
  }
  updateAmount(creditsToWithdraw) {
    if (this.props.credits < creditsToWithdraw) {
      return;
    }
    if (/^\d+$/.test(creditsToWithdraw)) {
      return this.setState({
        creditsToWithdraw: creditsToWithdraw,
      });
    }
    if (creditsToWithdraw === '') {
      this.setState({
        creditsToWithdraw: null,
      });
    }
  }
  async onWithdraw() {
    await this.props.withdrawToExternalWallet(
      this.state.withdrawAddress,
      this.state.creditsToWithdraw
    );
    goBack();
  }
  render() {
    return (
      <View style={styles.modal}>
        <View style={styles.modalWrap}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => goBack()}
          >
            <MaterialIcons name="close" size={28} color={Colors.white} />
          </TouchableOpacity>
          <View>
            <Text style={styles.modalTitle}>Withdraw credits</Text>
          </View>
          <View style={styles.fieldWithoutBorderTop}>
            <Text style={styles.currentBalance}>
              Current balance: {this.props.credits}
            </Text>
          </View>
          <View style={styles.field}>
            <MaterialIcons
              name="account-balance-wallet"
              size={22}
              color={Colors.white}
              style={styles.placeholderIcon}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Enter Stellar Address"
              autoCorrect={false}
              autoFocus={true}
              style={styles.addressInput}
              placeholderTextColor="white"
              value={this.state.withdrawAddress}
              onChangeText={this.updateWithdrawAddress.bind(this)}
              maxLength={56}
            />
          </View>
          <View style={styles.field}>
            <MaterialCommunityIcons
              name="coin"
              size={22}
              color={Colors.white}
              style={styles.placeholderIcon}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Amount to withdraw"
              autoCorrect={false}
              autoFocus={true}
              style={styles.input}
              placeholderTextColor="white"
              value={this.state.creditsToWithdraw}
              onChangeText={this.updateAmount.bind(this)}
              maxLength={18}
            />
          </View>
          <View style={styles.fieldWithoutBorder}>
            <Text style={styles.smallText}>
              Credits will converted and withdrawn in Stellar's
            </Text>
            <Text style={styles.smallText}>
              native currency (XLM), we charge a 10% fee
            </Text>
            <Text style={styles.smallText}>
              plus credit card processing fees.
            </Text>
          </View>
          <LargeBtn
            disabled={
              !(this.state.withdrawAddress && this.state.creditsToWithdraw)
            }
            onPress={this.onWithdraw.bind(this)}
            text={
              this.props.submittingWithdraw
                ? 'Submitting withdraw...'
                : 'Withdraw'
            }
          />
        </View>
      </View>
    );
  }
}

const modalWidth = Layout.window.width - 40;

const styles = StyleSheet.create({
  fieldWithoutBorderTop: {
    maxHeight: 40,
    flex: 1,
    justifyContent: 'flex-end',
  },
  fieldWithoutBorder: {
    maxHeight: 40,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  btn: {
    backgroundColor: Colors.brandBlue,
    width: 200,
    height: 30,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 12,
  },
  btnWrap: {
    flex: 1,
    backgroundColor: Colors.listItemBackground,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 100,
    top: 20,
  },
  listWrap: {
    backgroundColor: Colors.listItemBackground,
    flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalWrap: {
    flex: 1,
    flexDirection: 'column',
    maxHeight: 400,
    width: modalWidth,
    backgroundColor: Colors.overlayBackground,
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalTitle: {
    color: Colors.white,
    fontSize: 18,
    marginTop: 5,
  },
  field: {
    height: 40,
    maxHeight: 40,
    flex: 1,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentBalance: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 16,
    width: 270,
    bottom: 0,
  },
  smallText: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 10,
    width: 270,
    bottom: 0,
  },
  input: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 14,
    paddingLeft: 30,
    width: 270,
    bottom: 5,
  },
  addressInput: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 14,
    paddingLeft: 30,
    width: 270,
    bottom: 5,
  },
  placeholderIcon: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    backgroundColor: Colors.transparent,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
