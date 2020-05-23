import ApolloClient, { InMemoryCache } from 'apollo-boost';

import { AuthService } from 'shared/services';

export const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache({
    addTypename: false
  }),
  request: async operation => {
    const token = await AuthService.getJWToken();

    if (!!token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    }
  }
});
