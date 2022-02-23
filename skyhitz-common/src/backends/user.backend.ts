import { client } from './apollo-client.backend';
import { gql } from '@apollo/client';
import { SignUpForm } from '../types';

export class UserBackend {
  async getAuthenticatedUser() {
    return client
      .query({
        query: gql`
          {
            authenticatedUser {
              avatarUrl
              displayName
              username
              id
              jwt
              publishedAt
              email
              description
            }
          }
        `,
      })
      .then((data: any) => data.data)
      .then(({ authenticatedUser }) => authenticatedUser);
  }

  async signUp({ displayName, email, username, publicKey }: SignUpForm) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        createUserWithEmail(displayName: "${displayName}", email: "${email}", username: "${username}",publicKey: "${publicKey}"){
          avatarUrl
          displayName
          username
          id
          jwt
          publishedAt
          email
          description
        }
      }
      `,
      })
      .then((data: any) => data.data)
      .then(({ createUserWithEmail }) => createUserWithEmail)
      .catch(({ graphQLErrors }) => {
        let [{ message }] = graphQLErrors;
        throw message;
      });
  }

  async requestToken(usernameOrEmail, publicKey) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        requestToken(usernameOrEmail: "${usernameOrEmail}", publicKey: "${publicKey}")
      }
      `,
      })
      .then(({ data }: any) => {
        return data;
      })
      .catch(({ graphQLErrors }) => {
        let [{ message }] = graphQLErrors;
        throw message;
      });
  }

  async signIn(token: string, uid: string) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        signIn(token: "${token}", uid: "${uid}"){
          avatarUrl
          displayName
          username
          id
          jwt
          publishedAt
          email
          description
        }
      }
      `,
      })
      .then((data: any) => data.data)
      .then(({ signIn }) => signIn)
      .catch(({ graphQLErrors }) => {
        let [{ message }] = graphQLErrors;
        throw message;
      });
  }

  async updateUser(
    avatarUrl: string,
    displayName: string,
    description: string,
    username: string,
    email: string
  ) {
    return client
      .mutate({
        mutation: gql`
  mutation {
    updateUser(avatarUrl: "${avatarUrl}", displayName: "${displayName}", description: "${description}", username: "${username}", email: "${email}"){
      avatarUrl
      displayName
      username
      id
      publishedAt
      email
      description
    }
  }
  `,
      })
      .then((data: any) => data.data)
      .then(({ updateUser }) => updateUser)
      .catch(({ graphQLErrors }) => {
        let [{ message }] = graphQLErrors;
        throw message;
      });
  }
}

export const userBackend = new UserBackend();
