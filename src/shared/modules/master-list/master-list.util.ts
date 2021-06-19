import { FC } from 'react';

import * as ApolloReactHooks from '@apollo/react-hooks';
import * as ApolloReactCommon from '@apollo/react-common';

import { WatchQueryFetchPolicy } from 'apollo-boost';
import { OrderByArg } from 'shared/generated';

export type Entity<T> = { uuid: string } & T;

export interface IMasterComponent<T> {
  data: Entity<T>;
}

export interface QueryPayload<T> {
  payload: Entity<T>[];
}

export interface MutationDeletePayload {
  payload: { uuid: string };
}

export interface EntityWhereUniqueInput {
  id?: number | null;
  uuid?: string | null;
}

export interface MutationDeleteVariables {
  where: EntityWhereUniqueInput;
}

export interface QueryVariables {
  take: number;
  skip: number;
  order: {
    createdAt?: OrderByArg | null;
  };
}

export interface IMasterList<T> {
  take?: number;
  fetchPolicy?: WatchQueryFetchPolicy;
  title: string | string[];
  render: FC<IMasterComponent<T>>;
  isCreateButtonAvailable?: boolean;
  useQuery: (
    options: ApolloReactHooks.QueryHookOptions<QueryPayload<T>, QueryVariables>
  ) => ApolloReactCommon.QueryResult<QueryPayload<T>, QueryVariables>;
  useDeleteMutation?: (
    baseOptions?: ApolloReactHooks.MutationHookOptions<MutationDeletePayload, MutationDeleteVariables>
  ) => ApolloReactHooks.MutationTuple<MutationDeletePayload, MutationDeleteVariables>;
}
