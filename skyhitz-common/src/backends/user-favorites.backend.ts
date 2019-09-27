import { client } from './apollo-client.backend';
import gql from 'graphql-tag';

export class UserFavoritesBackend {
  async isFavorited(id: string) {
    return client
      .query({
        query: gql`
         {
          hasCreditFromUser(id: "${id}"){
            credits
            totalCredits
          }
        }
      `
      })
      .then((data: any) => data.data)
      .then(({ hasCreditFromUser }: any) => hasCreditFromUser)
      .catch(e => console.error(e));
  }
  async canCreditEntry(id: string) {
    return client
      .query({
        query: gql`
         {
          canCreditEntry(id: "${id}")
        }
      `
      })
      .then((data: any) => data.data)
      .then(({ canCreditEntry }: any) => canCreditEntry)
      .catch(e => console.error(e));
  }
  async creditEntry(id: string, credits: number) {
    return client
      .mutate({
        mutation: gql`
         mutation {
          creditEntry(id: "${id}", credits: ${credits})
        }
      `
      })
      .then((data: any) => data.data)
      .then(({ creditEntry }: any) => creditEntry)
      .catch(e => console.error(e));
  }
}

export const userFavoritesBackend = new UserFavoritesBackend();
