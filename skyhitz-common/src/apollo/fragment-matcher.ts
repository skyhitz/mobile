import { IntrospectionFragmentMatcher } from 'apollo-client';

/**
 * Fragment matcher makes querying union types possible
 */
export const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'UNION',
          name: 'SignInFacebook',
          possibleTypes: [
            {
              name: 'User'
            },
            {
              name: 'UsernameAndEmail'
            }
          ]
        },
      ],
    },
  }
});
