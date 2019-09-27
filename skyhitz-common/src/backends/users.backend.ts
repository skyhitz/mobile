import { client } from './apollo-client.backend';
import gql from 'graphql-tag';
import { User } from '../models/user.model';
import { usersIndex } from '../algolia/algolia';
import { isTesting } from '../config/index';

export class UsersBackend {
  async search(q: string) {
    if (!q) {
      return [];
    }

    const { hits } = await usersIndex.search({
      query: q,
      filters: `testing = ${isTesting}`,
      attributesToRetrieve: [
        'avatarUrl',
        'bannerUrl',
        'displayName',
        'username',
        'reputation',
        'id'
      ],
      hitsPerPage: 50
    });
    return hits.map((user: any) =>  new User(user));
  }

  async getRecentSearches(): Promise<User[]> {
    return client
    .query({
      query: gql`
    {
      recentUserSearches {
        avatarUrl
        bannerUrl
        displayName
        username
        reputation
        id
      }
    }
    `
    })
    .then((data: any) => data.data)
    .then(({ recentUserSearches }: any) => recentUserSearches.map((user: any) => new User(user)))
    .catch(e => {
      console.info(e);
      return [];
    });
  }

  async getTopSearches(): Promise<User[]> {
    return client
    .query({
      query: gql`
    {
      topUserSearches {
        avatarUrl
        bannerUrl
        displayName
        username
        reputation
        id
      }
    }
    `
    })
    .then((data: any) => data.data)
    .then(({ topUserSearches }: any) => topUserSearches.map((user: any) => new User(user)))
    .catch(e => {
      console.info(e);
      return [];
    });
  }

  async addRecentUserSearch(id: string) {
    return client
    .mutate({
      mutation: gql`
    mutation {
      addRecentUserSearch(id: "${id}")
    }
    `
    })
    .then((data: any) => data.data)
    .then(({ addRecentUserSearch }) => addRecentUserSearch);
  }
}

export const usersBackend = new UsersBackend();