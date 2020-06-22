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
        'displayName',
        'username',
        'reputation',
        'id',
      ],
      hitsPerPage: 50,
    });
    return hits.map((user: any) => new User(user));
  }

  async getRecentSearches(): Promise<User[]> {
    return [];
  }

  async getTopSearches(): Promise<User[]> {
    return [];
  }
}

export const usersBackend = new UsersBackend();
