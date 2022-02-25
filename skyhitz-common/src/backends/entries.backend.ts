import { client } from './apollo-client.backend';
import { gql } from '@apollo/client';
import { Entry } from '../models/entry.model';
import { entriesIndex } from '../algolia/algolia';

export class EntriesBackend {
  async search(q: string) {
    if (!q) {
      return [];
    }

    const { hits } = await entriesIndex.search(q);
    return hits;
  }

  async getPriceInfo(id: string) {
    return client
      .query({
        query: gql`
      {
        entryPrice(id: "${id}"){
          price
          amount
        }
      }
      `,
      })
      .then((data: any) => data.data)
      .then(({ entryPrice }: any) => {
        return {
          price: parseFloat(entryPrice.price),
          amount: parseFloat(entryPrice.amount),
        };
      })
      .catch((e) => {
        console.error(e);
        return { price: 0, amount: 0 };
      });
  }

  async getById(id: string) {
    return client
      .query({
        query: gql`
      {
        entries(id: "${id}"){
          imageUrl
          description
          title
          artist
          id
          videoUrl
        }
      }
      `,
      })
      .then((data: any) => data.data)
      .then(({ entries }: any) => {
        if (!entries.length) {
          return null;
        }
        return new Entry(entries[0]);
      })
      .catch((e) => {
        console.error(e);
        return null;
      });
  }

  async getByUserId(userId: string) {
    return client
      .query({
        query: gql`
      {
        entries(userId: "${userId}"){
          imageUrl
          description
          title
          artist
          id
          videoUrl
        }
      }
      `,
        fetchPolicy: 'network-only',
      })
      .then((data: any) => data.data)
      .then(({ entries }: any) => {
        if (!entries.length) {
          return null;
        }
        return entries.map((entry: any) => new Entry(entry));
      })
      .catch((e) => {
        console.error(e);
        return null;
      });
  }

  async buyEntry(id: string, amount: number, price: number) {
    return client
      .mutate({
        mutation: gql`
    mutation {
      buyEntry(id: "${id}", amount: ${amount}, price: ${price})
    }
    `,
      })
      .then((data: any) => data.data)
      .then(({ buyEntry }) => buyEntry);
  }

  async indexEntry(issuer: string) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        indexEntry(issuer: "${issuer}")
      }
      `,
      })
      .then(({ data }) => data.indexEntry);
  }

  async createFromUpload(
    cid: string,
    code: string,
    forSale: boolean = false,
    price: number = 0,
    equityForSale: number = 0
  ) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        createEntry(cid: "${cid}", code: "${code}", forSale: ${forSale}, price: ${price}, equityForSale: ${
          equityForSale / 100
        }){
          xdr
          success
          submitted
        }
      }
      `,
      })
      .then(({ data }) => data.createEntry)
      .then(
        ({
          xdr,
          success,
          submitted,
        }: {
          xdr: string;
          success: boolean;
          submitted: boolean;
        }) => ({
          xdr,
          success,
          submitted,
        })
      )
      .catch((e) => {
        console.info(e);
        return null;
      });
  }

  async getTopChart(): Promise<Entry[]> {
    return client
      .query({
        query: gql`
          {
            topChart {
              imageUrl
              description
              title
              artist
              id
              videoUrl
            }
          }
        `,
      })
      .then((data: any) => data.data)
      .then(({ topChart }: any) => {
        if (!topChart) {
          return [];
        }
        return topChart.map((entry: any) => new Entry(entry));
      })
      .catch((e) => {
        console.info(e);
        return [];
      });
  }

  async getRecentSearches(): Promise<Entry[]> {
    return [];
  }

  async getRecentlyAdded(): Promise<Entry[]> {
    return client
      .query({
        query: gql`
          {
            recentlyAdded {
              imageUrl
              description
              title
              artist
              id
              videoUrl
            }
          }
        `,
      })
      .then((data: any) => data.data)
      .then(({ recentlyAdded }: any) => {
        if (!recentlyAdded) {
          return [];
        }
        return recentlyAdded.map((entry: any) => new Entry(entry));
      })
      .catch((e) => {
        console.info(e);
        return [];
      });
  }

  async getTopSearches(): Promise<Entry[]> {
    return [];
  }

  remove(id: string) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        removeEntry(id: "${id}")
      }
      `,
      })
      .then((data: any) => data.data);
  }

  getIssuer(cid: string) {
    return client
      .query({
        query: gql`
          {
            getIssuer(cid: "${cid}")
          }
        `,
      })
      .then((data: any) => data.data)
      .then(({ getIssuer }) => getIssuer);
  }

  updatePricing(
    id: string,
    price: number,
    forSale: boolean,
    equityForSale: number
  ) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        updatePricing(id: "${id}", price: ${price}, forSale: ${forSale}, equityForSale: ${equityForSale})
      }
      `,
      })
      .then((data: any) => data.data);
  }
}

export const entriesBackend = new EntriesBackend();
