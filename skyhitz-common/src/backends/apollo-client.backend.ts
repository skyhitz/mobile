import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { observable } from 'mobx';
import LocalStorage from '../async-storage';
import { fragmentMatcher } from '../apollo/fragment-matcher';
import { Config } from '../config';

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
      const userData = await LocalStorage.getItem('userData');
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
      if (!response.ok) {
        response
          .clone()
          .text()
          .then((bodyText: any) => {
            console.info(
              `Network Error: ${response.status} (${response.statusText}) - ${bodyText}`
            );
            next();
          });
      } else {
        let isUnauthorized = false;
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
  fragmentMatcher,
  networkInterface: networkInterface,
});
