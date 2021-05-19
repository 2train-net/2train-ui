import { Gender, Scope, UserStatus, UserType } from 'shared/generated';

export interface ICurrentActivePlan {
  uuid: string;
  expireAt: string;
}

export interface IUserProfile {
  uuid: string;
  email: string;
  username: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday?: string;
  gender?: Gender | null;
  status: UserStatus;
  scope: Scope;
  type: UserType;
  currentActivePlan?: ICurrentActivePlan;
}
