import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { observer } from 'mobx-react';
import { Stores } from 'app/functions/Stores';
import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { P, A, H3 } from '@expo/html-elements';

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
    if (target.valueAsNumber > 2000) {
      return setAmount(2000);
    }
    setAmount(target.value);
  };

  const changeToOneTime = () => {
    setSelectedOption('one-time');
  };

  const changeToSubscription = () => {
    setSelectedOption('subscription');
  };

  const renderSubscribeBtn = () => {
    if (paymentsStore.submittingSubscription) {
      return (
        <RectButton style={styles.submitPayment}>
          <P>Submitting Transaction...</P>
        </RectButton>
      );
    }
    return (
      <RectButton style={styles.submitPayment} onPress={submit}>
        <P>Submit Payment</P>
      </RectButton>
    );
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
            <label>
              <H3>7</H3>
              <P>Monthly credit plan</P>
              <View style={styles.priceSection}>
                <strong>
                  <sup>$</sup>7
                </strong>
                <P style={styles.perMonth}>per month</P>
              </View>
              <View style={styles.radioWrapper}>
                <input
                  type="radio"
                  value="subscription"
                  checked={selectedOption === 'subscription'}
                  readOnly
                />
              </View>
            </label>
          </View>
        </A>
        <A onPress={changeToOneTime}>
          <View
            style={[
              styles.radio,
              selectedOption === 'one-time' ? styles.selected : {},
            ]}
          >
            <label>
              <input
                id="credits-input"
                type="number"
                max={2000}
                value={amount}
                onChange={handleAmountChange}
              />
              <P>Buy credits</P>
              <View style={styles.priceSection}>
                <strong>
                  <sup>$</sup>
                  {amount}
                </strong>
                <P style={styles.perMonth}>one time</P>
              </View>
              <View style={styles.radioWrapper}>
                <input
                  type="radio"
                  value="one-time"
                  checked={selectedOption === 'one-time'}
                  readOnly
                />
              </View>
            </label>
          </View>
        </A>
      </View>
      <CardElement />
      {renderSubscribeBtn()}
    </View>
  );
});

const styles = StyleSheet.create({
  radioWrapper: {
    backgroundColor: '#e9e9e9',
    borderRadius: 4,
    margin: 0,
  },
  perMonth: {
    fontSize: 13,
    fontWeight: '500',
  },
  priceSection: {
    marginBottom: 8,
    marginTop: 5,
  },
  radio: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e9e9e9',
    padding: 0,
    borderRadius: 4,
    width: 180,
    height: 166,
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  checkoutWrap: {
    marginTop: 0,
    marginHorizontal: 30,
  },
  checkingCopy: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 24,
    paddingTop: 30,
  },
  submitPayment: { marginTop: 60 },
  selected: {
    borderColor: '#777',
  },
});
