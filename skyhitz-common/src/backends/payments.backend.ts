import { client } from './apollo-client.backend';
import { gql } from '@apollo/client';

export class PaymentsBackend {
  async subscribe(cardToken: string) {
    return client
      .mutate({
        mutation: gql`
    mutation {
      subscribeUser(cardToken: "${cardToken}")
    }
    `,
      })
      .then((data: any) => data.data)
      .then(({ subscribeUser }) => subscribeUser);
  }
  async buyCredits(cardToken: string, amount: number) {
    return client
      .mutate({
        mutation: gql`
    mutation {
      buyCredits(cardToken: "${cardToken}", amount: ${amount})
    }
    `,
      })
      .then((data: any) => data.data)
      .then(({ buyCredits }) => buyCredits);
  }
  async getXLMPrice() {
    return client
      .query({
        query: gql`
          {
            xlmPrice
          }
        `,
        fetchPolicy: 'network-only',
      })
      .then((data: any) => data.data)
      .then(({ xlmPrice }) => xlmPrice);
  }
  async withdrawToExternalWallet(address: string, amount: number) {
    return client
      .mutate({
        mutation: gql`
    mutation {
      withdrawToExternalWallet(address: "${address}", amount: ${amount})
    }
    `,
      })
      .then((data: any) => data.data)
      .then(({ withdrawToExternalWallet }) => withdrawToExternalWallet);
  }
  async refreshSubscription() {
    return client
      .query({
        query: gql`
          {
            paymentsInfo {
              subscribed
              credits
            }
          }
        `,
        fetchPolicy: 'network-only',
      })
      .then((data: any) => data.data)
      .then(({ paymentsInfo }) => paymentsInfo);
  }
}

export const paymentsBackend = new PaymentsBackend();
