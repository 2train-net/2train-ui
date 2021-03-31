import { UserStatus } from 'shared/generated/graphql-schema';

export interface IUserProfile {
  uuid: string;
  email: string;
  avatar: string;
  status: UserStatus;
}
