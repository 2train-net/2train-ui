import { FC } from 'react';

import {
  WatchQueryFetchPolicy,
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  QueryResult
} from '@apollo/client';

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
    options: QueryHookOptions<QueryPayload<T>, QueryVariables>
  ) => QueryResult<QueryPayload<T>, QueryVariables>;
  useDeleteMutation?: (
    baseOptions?: MutationHookOptions<MutationDeletePayload, MutationDeleteVariables>
  ) => MutationTuple<MutationDeletePayload, MutationDeleteVariables>;
}
