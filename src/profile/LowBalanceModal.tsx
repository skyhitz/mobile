import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
} from 'react-native';
import Colors from 'app/src/constants/Colors';
import LargeBtn from 'app/src/ui/LargeBtn';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import cursorPointer from 'app/src/constants/CursorPointer';
import CloseIcon from 'app/src/ui/icons/x';
import WalletIcon from 'app/src/ui/icons/wallet';
import DollarIcon from 'app/src/ui/icons/dollar';
import { userAtom } from '../atoms/atoms';
import { useRecoilValue } from 'recoil';
import { PaymentsStore } from '../stores/payments.store';

export default (props) => {
  const { credits } = PaymentsStore();
  const user = useRecoilValue(userAtom);
  const { goBack } = useNavigation();
  const linkTo = useLinkTo();

  const onWithdraw = async () => {
    goBack();
    linkTo('/payment');
  };

  return (
    <View style={styles.modal}>
      <View style={styles.modalWrap}>
        <Pressable
          style={[styles.closeBtn, cursorPointer]}
          onPress={() => goBack()}
        >
          <CloseIcon size={28} color={Colors.white} />
        </Pressable>
        <View>
          <Text style={styles.modalTitle}>Balance too low!</Text>
        </View>
        <Text style={styles.smallText}>
          We require a minimum balance of 2 XLM before you can mint a new NFT.
        </Text>
        <View>
          <Text style={styles.currentBalance}>
            Available Balance:{'   '}
            <View>
              <DollarIcon size={12} color={Colors.white} />
            </View>{' '}
            {credits.toFixed(4)}
          </Text>
        </View>
        <View>
          <Text style={styles.currentBalance}>
            Required Minimum:{'   '}
            <View>
              <DollarIcon size={12} color={Colors.white} />
            </View>{' '}
            {'2'}
          </Text>
        </View>

        <Text style={styles.smallText}>
          Please transfer more XLM to your account:{' '}
        </Text>
        <View style={styles.field}>
          <View style={styles.placeholderIcon}>
            <WalletIcon size={22} color={Colors.white} />
          </View>

          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Stellar Address (Without Memo)"
            autoCorrect={false}
            autoFocus={true}
            style={[
              styles.addressInput,
              Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
            ]}
            placeholderTextColor="white"
            value={user?.publicKey}
            maxLength={56}
          />
        </View>

        <Text style={[styles.smallText, { textAlign: 'center' }]}>or</Text>

        <LargeBtn onPress={onWithdraw} text={'Buy With Card'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldWithoutBorderTop: {
    maxHeight: 40,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  fieldWithoutBorder: {
    maxHeight: 40,
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 0,
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
    bottom: 0,
  },
  smallText: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 14,
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
    left: 0,
    backgroundColor: Colors.transparent,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
