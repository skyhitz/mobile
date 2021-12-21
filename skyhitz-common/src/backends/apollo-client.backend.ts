import {
  ApolloClient,
  InMemoryCache,
  from,
  createHttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import { observable } from 'mobx';
import { Config } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export let forceSignOut = observable.box(false);

const httpLink = createHttpLink({
  uri: Config.GRAPHQL_URL,
  fetchOptions: {
    mode: 'no-cors',
  },
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const userData = await AsyncStorage.getItem('userData');
  if (userData) {
    const { jwt } = JSON.parse(userData);
    if (jwt) {
      return {
        headers: {
          ...headers,
          authorization: jwt ? `Bearer ${jwt}` : '',
        },
      };
    }
  }
  return {
    headers: {
      ...headers,
    },
  };
});

const logoutLink = onError(({ networkError }: any) => {
  if (
    (networkError && networkError.statusCode === 401) ||
    networkError.statusText === 'Unauthorized'
  )
    forceSignOut.set(true);
});

export const client = new ApolloClient({
  link: from([authLink, logoutLink, httpLink]),
  cache: new InMemoryCache(),
});
