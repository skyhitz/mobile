import { TransactionBuilder, Account, Networks, BASE_FEE } from 'stellar-base';

export const generateFeeBumpXdr = (publicKey: string) => {
  const feeBumpTransaction = new TransactionBuilder(
    new Account(publicKey, '0'),
    { fee: BASE_FEE, networkPassphrase: Networks.PUBLIC }
  )
    .setTimeout(0)
    .build();
  return feeBumpTransaction.toEnvelope().toXDR('base64');
};

// get a messaged signed by the user's private key
// send that signed message to the horizon server
// return the response from the horizon server
// add time limits, upper bound to 5 minutes from now
// backend: if no timeout invalid
// backend: if it is not within 5 mins invalid

// generate random string
