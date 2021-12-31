import { FC } from 'react';

import {
  WatchQueryFetchPolicy,
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  QueryResult,
} from '@apollo/client';

import { OrderByArg } from 'shared/generated';

import { Leaves } from 'shared/interfaces';

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

export interface QueryVariables<K> {
  take: number;
  skip: number;
  order: {
    createdAt?: OrderByArg | null;
  };
  where?: K | null;
}

export interface IMasterList<T, K> {
  fetchPolicy?: WatchQueryFetchPolicy;
  title: string | string[];
  render: FC<IMasterComponent<T>>;
  isCreateButtonAvailable?: boolean;
  filters?: Array<{ label: string; value: Leaves<K, 3> }>;
  useQuery: (
    options: QueryHookOptions<QueryPayload<T>, QueryVariables<K>>
  ) => QueryResult<QueryPayload<T>, QueryVariables<K>>;
  useDeleteMutation?: (
    baseOptions?: MutationHookOptions<MutationDeletePayload, MutationDeleteVariables>
  ) => MutationTuple<MutationDeletePayload, MutationDeleteVariables>;
}

export interface ISearchForm<K> {
  search: string;
  filter: Leaves<K, 3>;
  take: number;
}

export const DEBOUNCE_SEARCH_TIMEOUT = 1000;

export const entriesPerPage = [10, 25, 50].map((entry) => ({ label: `${entry}`, value: entry }));
