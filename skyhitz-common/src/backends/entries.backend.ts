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
          price
          forSale
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
          price
          forSale
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

  async create(id: string) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        createEntry(id: "${id}"){
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
      .then(({ createEntry }) => {
        return new Entry(createEntry);
      })
      .catch((e) => {
        return this.getById(id);
      });
  }

  async createFromUpload(
    cid: string,
    imageUrl: string,
    videoUrl: string,
    code: string,
    description: string,
    title: string,
    artist: string,
    forSale: boolean = false,
    price: number = 0,
    equityForSale: number = 0
  ) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        createEntry(cid: "${cid}",imageUrl: "${imageUrl}", videoUrl: "${videoUrl}", code: "${code}", description: "${description}", title: "${title}", artist: "${artist}", forSale: ${forSale}, price: ${price}, equityForSale: ${
          equityForSale / 100
        }){
          xdr
        }
      }
      `,
      })
      .then((data: any) => data.data)
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
              price
              forSale
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
              price
              forSale
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

  generateIssuer() {
    return client
      .mutate({
        mutation: gql`
          mutation {
            generateIssuer
          }
        `,
      })
      .then((data: any) => data.data)
      .then(({ generateIssuer }) => generateIssuer);
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
