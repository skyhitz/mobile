import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { observer } from 'mobx-react';
import { Stores } from 'app/src/functions/Stores';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import { P, H3 } from '@expo/html-elements';
import Colors from 'app/src/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import cursorPointer from 'app/src/constants/CursorPointer';

async function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default observer((props) => {
  const [amount, setAmount] = useState(200);
  const stripe = useStripe();
  const elements = useElements();
  const { goBack } = useNavigation();

  const { paymentsStore } = Stores();
  const [selectedOption, setSelectedOption] = useState(
    paymentsStore.subscribed ? 'one-time' : 'subscription'
  );

  useEffect(() => {
    paymentsStore.refreshXLMPrice();
  }, []);

  const refreshSubscription = async () => {
    paymentsStore.setLoadingBalance(true);
    let lastBalance = paymentsStore.credits;
    await timeout(15000);
    await paymentsStore.refreshSubscription();
    if (lastBalance === paymentsStore.credits) {
      paymentsStore.setLoadingBalance(true);
      await timeout(15000);
      paymentsStore.refreshSubscription();
    }
  };

  const onSubmit = (e) => {
    if (e.nativeEvent.key == 'Enter') {
      submit();
    }
  };

  const submit = async () => {
    paymentsStore.setSubmittingSubscription(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    const { token } = await stripe.createToken(cardElement);

    if (!token) return;
    const { id } = token;
    if (selectedOption === 'one-time') {
      const purchased = await paymentsStore.buyCredits(
        id,
        amount * paymentsStore.xlmPriceWithFees
      );

      if (purchased) {
        goBack();
        refreshSubscription();
      }
      return;
    }

    const subscribed = await paymentsStore.subscribeUser(id);
    if (subscribed) {
      goBack();
      refreshSubscription();
    }
  };

  const handleAmountChange = ({ target }) => {
    let tar = parseInt(target.value);
    if (tar > 2000) {
      return setAmount(2000);
    }
    if (tar < 1 || !tar) {
      return setAmount(1);
    }
    setAmount(tar);
  };

  const changeToOneTime = () => {
    setSelectedOption('one-time');
  };

  const changeToSubscription = () => {
    setSelectedOption('subscription');
  };

  if (!paymentsStore.subscriptionLoaded) {
    return (
      <View style={styles.checkoutWrap}>
        <P style={styles.checkingCopy}>Checking if you already subscribed...</P>
      </View>
    );
  }
  return (
    <View style={styles.checkoutWrap}>
      <View style={styles.options}>
        {!paymentsStore.subscribed && (
          <TouchableHighlight onPress={changeToSubscription}>
            <View
              style={[
                styles.radio,
                selectedOption === 'subscription' ? styles.selected : {},
              ]}
            >
              <View>
                <H3 style={styles.priceHeaders}>
                  {paymentsStore.xlmPrice &&
                    (7.99 / paymentsStore.xlmPriceWithFees).toFixed(2)}
                </H3>
                <P style={styles.description}>Monthly XLM plan</P>
                <View style={styles.priceSection}>
                  <P style={styles.perMonth}>$7.99 per month</P>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        )}
        <TouchableHighlight onPress={changeToOneTime}>
          <View
            style={[
              styles.radio,
              selectedOption === 'one-time' ? styles.selected : {},
            ]}
          >
            <View>
              <TextInput
                keyboardType={Platform.OS === 'web' ? 'default' : 'number-pad'}
                value={amount ? String(amount) : undefined}
                onChange={handleAmountChange}
                onChangeText={(value) =>
                  handleAmountChange({ target: { value: value } })
                }
                style={[
                  styles.priceHeaders,
                  Platform.OS === 'web'
                    ? ({ outlineWidth: 0, backgroundColor: '#e9e9e9' } as any)
                    : {},
                ]}
                onKeyPress={onSubmit}
              />
              <P style={styles.description}>Buy XLM</P>
              <View style={styles.priceSection}>
                <P style={styles.perMonth}>
                  $
                  {paymentsStore.xlmPrice &&
                    (amount * paymentsStore.xlmPriceWithFees).toFixed(2)}{' '}
                  one time
                </P>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
      <CardElement
        options={{
          hidePostalCode: true,
          style: {
            base: {
              color: Colors.white,
              '::placeholder': {
                color: Colors.white,
              },
            },
            invalid: {
              color: Colors.errorBackground,
            },
          },
        }}
      />
      {paymentsStore.submittingSubscription ? (
        <Pressable style={[styles.submitPayment, cursorPointer]}>
          <P style={styles.submitPaymentText}>Submitting Transaction...</P>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.submitPayment, cursorPointer]}
          onPress={submit}
        >
          <P style={styles.submitPaymentText}>Submit Payment</P>
        </Pressable>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  radioWrapper: {
    backgroundColor: '#e9e9e9',
    borderRadius: 4,
    margin: 0,
  },
  description: {
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 0,
  },
  perMonth: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    margin: 0,
    paddingLeft: 0,
  },
  priceSection: {
    marginBottom: 8,
    marginTop: 5,
  },
  priceHeaders: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '500',
    marginTop: 15,
    marginBottom: 0,
  },
  radio: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#e9e9e9',
    padding: 0,
    borderRadius: 4,
    width: 160,
    height: 166,
    margin: 10,
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 50,
    flexDirection: 'row',
  },
  checkoutWrap: {
    marginTop: 0,
    marginHorizontal: 0,
  },
  checkingCopy: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 24,
    paddingTop: 30,
  },
  submitPayment: {
    marginTop: 60,
    backgroundColor: Colors.brandBlue,
    width: 220,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  selected: {
    borderColor: Colors.brandBlue,
    borderWidth: 3,
  },
  submitPaymentText: {
    color: Colors.white,
    fontWeight: '500',
  },
});
