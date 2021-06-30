import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { observable } from 'mobx';
import { Config } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

let networkInterface = createNetworkInterface({
  uri: Config.GRAPHQL_URL,
});

export let forceSignOut = observable.box(false);

/**
 * Gets the JWT token from local storage and passes it
 * on the authorization headers for each request.
 */
networkInterface.use([
  {
    async applyMiddleware(req: any, next: any) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { jwt } = JSON.parse(userData);
        if (jwt) {
          req.options.headers.authorization = `Bearer ${jwt}`;
        }
      }

      next();
    },
  },
]);

/**
 * Loggs out the user when making unauthorized requests.
 */
networkInterface.useAfter([
  {
    applyAfterware({ response }: any, next: any) {
      let isUnauthorized = false;

      if (!response.ok) {
        response
          .clone()
          .text()
          .then((bodyText: any) => {
            console.info(
              `Network Error: ${response.status} (${response.statusText}) - ${bodyText}`
            );
            if (response.statusText === 'Unauthorized') {
              forceSignOut.set(true);
              return;
            }

            next();
          });
      } else {
        response
          .clone()
          .json()
          .then(({ errors }: any) => {
            if (errors) {
              console.info('GraphQL Errors:', errors);
              errors.some((error: any) => {
                if (error.message === 'Unauthorized User') {
                  return (isUnauthorized = true);
                }
              });
            }
          })
          .then(() => {
            if (isUnauthorized) {
              forceSignOut.set(true);
              return;
            }
            next();
          });
      }
    },
  },
]);

export const client = new ApolloClient({
  networkInterface: networkInterface,
});
