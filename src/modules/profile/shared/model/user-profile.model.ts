import { IUserProfile } from 'shared/model';
import { UserStatus, Gender, Scope } from 'shared/generated';

export interface IUserProfileForm {
  avatarBase64: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday?: string;
  gender?: Gender | null;
  scope: Scope;
}

export interface IUpdateUserProfileForm {
  avatarBase64?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthday?: string;
  gender?: Gender | null;
  scope?: Scope;
}

export interface IUserProfileQuery {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  scope: Scope;
  status: UserStatus;
  birthday?: string;
  gender?: Gender | null;
  avatar?: string | null;
}

export class UserProfile {
  public readonly email: string;
  public readonly avatar: string;
  public readonly username: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phone: string;
  public readonly gender?: Gender | null;
  public readonly birthday?: string;
  public readonly status: UserStatus;
  public readonly scope: Scope;

  constructor(data?: IUserProfile) {
    this.email = data ? data.email : '';
    this.username = data ? data.username : '';
    this.avatar = (data && data.avatar) || '';
    this.status = data ? data.status : UserStatus.Confirmed;
    this.firstName = data ? data.firstName : '';
    this.lastName = data ? data.lastName : '';
    this.phone = data ? data.phone : '';
    this.gender = data ? data.gender : undefined;
    this.birthday = data ? data.birthday : '';
    this.scope = data ? data.scope : Scope.Private;
  }

  public get userProfileForm(): IUserProfileForm {
    return {
      avatarBase64: this.avatar,
      username: this.username,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      birthday: this.birthday,
      gender: this.gender,
      scope: this.scope
    };
  }
}
