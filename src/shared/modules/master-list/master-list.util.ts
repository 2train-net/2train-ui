import { FC } from 'react';

import * as ApolloReactHooks from '@apollo/react-hooks';
import * as ApolloReactCommon from '@apollo/react-common';

import { WatchQueryFetchPolicy } from 'apollo-boost';

export type Entity<T> = { uuid: string } & T;

export interface IMasterComponent<T> {
  data: Entity<T>;
}

export interface QueryPayload<T> {
  payload: Entity<T>[];
}

export interface QueryVariables {
  take: number;
  skip: number;
}

export interface IMasterList<T> {
  take?: number;
  fetchPolicy?: WatchQueryFetchPolicy;
  render: FC<IMasterComponent<T>>;
  useQuery: (
    options: ApolloReactHooks.QueryHookOptions<QueryPayload<T>, QueryVariables>
  ) => ApolloReactCommon.QueryResult<QueryPayload<T>, QueryVariables>;
}
