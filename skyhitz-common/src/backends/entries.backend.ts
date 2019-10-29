import { client } from './apollo-client.backend';
import gql from 'graphql-tag';
import { Entry } from '../models/entry.model';
import { entriesIndex } from '../algolia/algolia';
import { isTesting } from '../config/index';

export class EntriesBackend {
  async search(q: string) {
    if (!q) {
      return [];
    }

    const { hits } = await entriesIndex.search({
      query: q,
      filters: `testing = ${isTesting}`,
      attributesToRetrieve: [
        'imageUrl',
        'userDisplayName',
        'userUsername',
        'description',
        'title',
        'artist',
        'id',
        'videoUrl',
        'price',
        'forSale',
      ],
      hitsPerPage: 50,
    });
    return hits;
  }

  async getById(id: string) {
    return client
      .query({
        query: gql`
      {
        entries(id: "${id}"){
          imageUrl
          userDisplayName
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
      .catch(e => {
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
          userDisplayName
          userUsername
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
      .catch(e => {
        console.error(e);
        return null;
      });
  }

  async addRecentEntrySearch(id: string) {
    return client
      .mutate({
        mutation: gql`
    mutation {
      addRecentEntrySearch(id: "${id}")
    }
    `,
      })
      .then((data: any) => data.data)
      .then(({ addRecentEntrySearch }) => addRecentEntrySearch);
  }

  async buyEntry(id: string) {
    return client
      .mutate({
        mutation: gql`
    mutation {
      buyEntry(id: "${id}")
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
          userDisplayName
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
      .catch(e => {
        return this.getById(id);
      });
  }

  async createFromUpload(
    etag: string,
    imageUrl: string,
    videoUrl: string,
    description: string,
    title: string,
    artist: string,
    id: string,
    forSale: boolean = false,
    price: number = 0
  ) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        createEntry(etag: "${etag}", imageUrl: "${imageUrl}", videoUrl: "${videoUrl}", description: "${description}", title: "${title}", artist: "${artist}", id: "${id}", forSale: ${forSale}, price: ${price}){
          videoUrl
          imageUrl
          description
          title
          artist
          id
        }
      }
      `,
      })
      .then((data: any) => data.data)
      .then(({ createEntry }) => {
        return new Entry(createEntry);
      });
  }

  async getRecentSearches(): Promise<Entry[]> {
    return client
      .query({
        query: gql`
          {
            recentEntrySearches {
              imageUrl
              userDisplayName
              userUsername
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
      .then(({ recentEntrySearches }: any) => {
        if (!recentEntrySearches) {
          return [];
        }
        return recentEntrySearches.map((entry: any) => new Entry(entry));
      })
      .catch(e => {
        console.info(e);
        return [];
      });
  }

  async getRecentlyAdded(): Promise<Entry[]> {
    return client
      .query({
        query: gql`
          {
            recentlyAdded {
              imageUrl
              userDisplayName
              userUsername
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
      .catch(e => {
        console.info(e);
        return [];
      });
  }

  async getTopSearches(): Promise<Entry[]> {
    return client
      .query({
        query: gql`
          {
            topEntrySearches {
              imageUrl
              userDisplayName
              userUsername
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
      .then(({ topEntrySearches }: any) =>
        topEntrySearches.map((entry: any) => new Entry(entry))
      )
      .catch(e => {
        console.info(e);
        return [];
      });
  }

  remove(id: string, cloudinaryPublicId: string) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        removeEntry(id: "${id}", cloudinaryPublicId: "${cloudinaryPublicId}")
      }
      `,
      })
      .then((data: any) => data.data);
  }

  youtubeUpload(
    videoUrl: string,
    description: string,
    title: string,
    id: string
  ) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        youtubeUpload(videoUrl: "${videoUrl}", description: "${description}", title: "${title}", id: "${id}")
      }
      `,
      })
      .then((data: any) => data.data);
  }

  updatePricing(id: string, price: number, forSale: boolean) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        updatePricing(id: "${id}", price: ${price}, forSale: ${forSale})
      }
      `,
      })
      .then((data: any) => data.data);
  }
}

export const entriesBackend = new EntriesBackend();
