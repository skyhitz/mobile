import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';
import { StyleSheet, View, TextInput, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { P, A, H3 } from '@expo/html-elements';
import Colors from 'app/constants/Colors';

export default observer((props) => {
  const [selectedOption, setSelectedOption] = useState('subscription');
  const [amount, setAmount] = useState(50);
  const stripe = useStripe();
  const elements = useElements();

  const { paymentsStore } = Stores();

  const submit = async () => {
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
      const purchased = await paymentsStore.buyCredits(id, amount);
      if (purchased) {
        console.log('Purchase Complete!');
      }
      return;
    }

    const subscribed = await paymentsStore.subscribeUser(id);
    if (subscribed) {
      console.log('Purchase Complete!');
    }
  };

  const handleOptionChange = (changeEvent) => {
    setSelectedOption(changeEvent.target.value);
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
        <A onPress={changeToSubscription}>
          <View
            style={[
              styles.radio,
              selectedOption === 'subscription' ? styles.selected : {},
            ]}
          >
            <View>
              <H3 style={styles.priceHeaders}>7</H3>
              <P style={styles.description}>Monthly credit plan</P>
              <View style={styles.priceSection}>
                <P style={styles.perMonth}>$7.21 per month</P>
              </View>
            </View>
          </View>
        </A>
        <A onPress={changeToOneTime}>
          <View
            style={[
              styles.radio,
              selectedOption === 'one-time' ? styles.selected : {},
            ]}
          >
            <View>
              <TextInput
                keyboardType={'numeric'}
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
              />
              <P style={styles.description}>Buy credits</P>
              <View style={styles.priceSection}>
                <P style={styles.perMonth}>${amount * 1.03} one time</P>
              </View>
            </View>
          </View>
        </A>
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
        <RectButton style={styles.submitPayment}>
          <P style={styles.submitPaymentText}>Submitting Transaction...</P>
        </RectButton>
      ) : (
        <RectButton style={styles.submitPayment} onPress={submit}>
          <P style={styles.submitPaymentText}>Submit Payment</P>
        </RectButton>
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
