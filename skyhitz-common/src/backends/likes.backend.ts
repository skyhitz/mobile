import { client } from './apollo-client.backend';
import gql from 'graphql-tag';

export class LikesBackend {
  async userLikes() {
    return client
      .query({
        query: gql`
          {
            userLikes(offset: 0, limit: 500) {
              imageUrl
              userDisplayName
              description
              title
              id
            }
          }
        `,
      })
      .then((data: any) => data.data)
      .then(({ userLikes }: any) => userLikes)
      .catch(e => console.error(e));
  }
  async entryLikes(id: string) {
    return client
      .query({
        query: gql`
      {
        entryLikes(id: "${id}", offset: 0, limit: 8) {
          count
          users {
            avatarUrl
            bannerUrl
            displayName
            username
            reputation
            id
  	      }
        }
      }
      `,
      })
      .then((data: any) => data.data)
      .then(({ entryLikes }: any) => entryLikes)
      .catch(e => console.error(e));
  }
  async like(id: string, like = true) {
    return client
      .mutate({
        mutation: gql`
        mutation {
          likeEntry(id: "${id}", like: ${like})
        }
      `,
      })
      .then((data: any) => data.data)
      .then(({ likeEntry }: any) => likeEntry)
      .catch(e => console.error(e));
  }
}

export const likesBackend = new LikesBackend();
