import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import Colors from 'app/constants/Colors';
import LargeBtn from 'app/modules/ui/LargeBtn';
import { Stores } from 'app/functions/Stores';
import { useNavigation } from '@react-navigation/native';

export default observer((props) => {
  const { paymentsStore } = Stores();
  const { goBack } = useNavigation();
  const [address, setAddress] = useState('');
  const [creditsToWithdraw, setCreditsToWithdraw] = useState(0);

  const updateWithdrawAddress = ({ target }: any) => {
    setAddress(target.value);
  };

  const updateAmount = ({ target }: any) => {
    let creditsToWithdraw = parseFloat(target.value);
    if (paymentsStore.credits < creditsToWithdraw) {
      return;
    }

    return setCreditsToWithdraw(creditsToWithdraw);
  };

  const onWithdraw = async () => {
    await paymentsStore.withdrawToExternalWallet(address, creditsToWithdraw);
    goBack();
  };

  return (
    <View style={styles.modal}>
      <View style={styles.modalWrap}>
        <Pressable style={styles.closeBtn} onPress={() => goBack()}>
          <MaterialIcons name="close" size={28} color={Colors.white} />
        </Pressable>
        <View>
          <Text style={styles.modalTitle}>Withdraw credits</Text>
        </View>
        <View style={styles.fieldWithoutBorderTop}>
          <Text style={styles.currentBalance}>
            Current balance: {paymentsStore.credits}
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
            placeholder="Stellar or AnchorUSD Address"
            autoCorrect={false}
            autoFocus={true}
            style={[
              styles.addressInput,
              Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
            ]}
            placeholderTextColor="white"
            value={address}
            onChange={updateWithdrawAddress}
            onChangeText={(value) =>
              updateWithdrawAddress({ target: { value: value } })
            }
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
            placeholder="USD to withdraw"
            autoCorrect={false}
            autoFocus={true}
            style={[
              styles.input,
              Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
            ]}
            placeholderTextColor="white"
            keyboardType={'numeric'}
            value={creditsToWithdraw ? String(creditsToWithdraw) : undefined}
            onChange={updateAmount}
            onChangeText={(value) => updateAmount({ target: { value: value } })}
            maxLength={18}
          />
        </View>
        <View style={styles.fieldWithoutBorder}>
          <Text style={styles.smallText}>
            Withdraw to an AnchorUSD's address, or
          </Text>
          <Text style={styles.smallText}>
            a Stellar address that trusts AnchorUSD.
          </Text>
        </View>
        <LargeBtn
          disabled={!(address && creditsToWithdraw)}
          onPress={onWithdraw}
          text={
            paymentsStore.submittingWithdraw
              ? 'Submitting withdraw...'
              : 'Withdraw'
          }
        />
      </View>
    </View>
  );
});

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
    maxHeight: 500,
    maxWidth: 600,
    width: '100%',
    backgroundColor: Colors.overlayBackground,
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
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
