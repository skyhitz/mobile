import { client } from './apollo-client.backend';
import gql from 'graphql-tag';
import { User } from '../models/user.model';
import { SignUpForm, SignInForm } from '../types';
import { isTesting } from '../config/index';

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
              phone
            }
          }
        `,
      })
      .then((data: any) => data.data)
      .then(({ authenticatedUser }) => authenticatedUser);
  }

  async signUp({ displayName, email, username, password }: SignUpForm) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        createUserWithEmail(displayName: "${displayName}", email: "${email}", username: "${username}", password: "${password}", testing:${
          isTesting ? true : false
        }){
          avatarUrl
          displayName
          username
          id
          jwt
          publishedAt
          email
          description
          phone
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

  async signIn({ usernameOrEmail, password }: SignInForm) {
    return client
      .mutate({
        mutation: gql`
      mutation {
        signIn(usernameOrEmail: "${usernameOrEmail}", password: "${password}"){
          avatarUrl
          displayName
          username
          id
          jwt
          publishedAt
          email
          description
          phone
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

  async sendResetEmail(email: string) {
    return client
      .mutate({
        mutation: gql`
    mutation {
      sendResetEmail(email: "${email}")
    }
    `,
      })
      .then((data: any) => data.data)
      .then(({ sendResetEmail }) => sendResetEmail)
      .catch(({ graphQLErrors }) => {
        let [{ message }] = graphQLErrors;
        throw message;
      });
  }

  async updatePassword(token: string, password: string) {
    return client
      .mutate({
        mutation: gql`
    mutation {
      updatePassword(token: "${token}", password: "${password}"){
        avatarUrl
        displayName
        username
        id
        jwt
        publishedAt
        email
        description
        phone
      }
    }
    `,
      })
      .then((data: any) => data.data)
      .then(({ updatePassword }) => updatePassword)
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
    email: string,
    phone: string
  ) {
    return client
      .mutate({
        mutation: gql`
  mutation {
    updateUser(avatarUrl: "${avatarUrl}", displayName: "${displayName}", description: "${description}", username: "${username}", email: "${email}", phone: "${phone}"){
      avatarUrl
      displayName
      username
      id
      jwt
      publishedAt
      email
      description
      phone
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

  async updateAlgoliaEntriesWithUser() {
    return client
      .mutate({
        mutation: gql`
          mutation {
            updateAlgoliaEntriesWithUser
          }
        `,
      })
      .then((data: any) => data.data)
      .then(({ updateAlgoliaEntriesWithUser }) => updateAlgoliaEntriesWithUser)
      .catch(({ graphQLErrors }) => {
        let [{ message }] = graphQLErrors;
        throw message;
      });
  }
}

export const userBackend = new UserBackend();
