import { client } from './apollo-client.backend';
import { gql } from '@apollo/client';

export class LikesBackend {
  async userLikes() {
    return client
      .query({
        query: gql`
          {
            userLikes {
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
      .then(({ userLikes }: any) => userLikes)
      .catch((e) => console.error(e));
  }
  async entryLikes(id: string) {
    return client
      .query({
        query: gql`
      {
        entryLikes(id: "${id}") {
          count
          users {
            avatarUrl
            displayName
            username
            id
  	      }
        }
      }
      `,
      })
      .then((data: any) => data.data)
      .then(({ entryLikes }: any) => entryLikes)
      .catch((e) => console.error(e));
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
      .catch((e) => console.error(e));
  }
}

export const likesBackend = new LikesBackend();
