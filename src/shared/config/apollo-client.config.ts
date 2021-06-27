import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { SentryLink } from 'apollo-link-sentry';
import { onError } from '@apollo/client/link/error';

import * as Sentry from '@sentry/react';

import { AuthService } from 'shared/services';

const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_URL });

const withToken = setContext(async () => {
  const token = await AuthService.getJWToken();

  return { token };
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const { token } = operation.getContext();

  operation.setContext(() => ({
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }));

  return forward(operation);
});

const sentryMiddleware = new SentryLink({
  attachBreadcrumbs: {
    includeQuery: true,
    includeVariables: true,
    includeFetchResult: true,
    includeError: true,
    includeCache: true
  }
});

const errorMiddleware = onError(({ graphQLErrors, operation }) => {
  if (graphQLErrors) {
    const [error] = graphQLErrors;

    Sentry.withScope(scope => {
      scope.setTag('kind', operation.operationName);
      scope.setExtra('query', operation.query);
      scope.setExtra('variables', operation.variables);
      scope.setExtra('response', graphQLErrors);

      Sentry.captureMessage(error.message);
    });
  }
});

const link = ApolloLink.from([withToken, sentryMiddleware, errorMiddleware, authMiddleware.concat(httpLink)]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false
  })
});
