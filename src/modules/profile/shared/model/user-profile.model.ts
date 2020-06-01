import { UserStatus, Gender } from 'shared/generated/graphql-schema';

export interface IUserProfileForm {
  avatarBase64: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday?: string;
  gender?: Gender | null;
}

export interface IPerson {
  firstName: string;
  lastName: string;
  phone: string;
  gender?: Gender | null;
  birthday?: string;
}

export interface IUserProfileQuery {
  email: string;
  avatar?: string | null;
  status: UserStatus;
  person?: IPerson;
}

export class UserProfile {
  public readonly email: string;
  public readonly avatar: string;
  public readonly status: UserStatus;
  public readonly person: IPerson;

  constructor(data?: IUserProfileQuery) {
    this.email = data ? data.email : '';
    this.avatar = (data && data.avatar) || '';
    this.status = data ? data.status : UserStatus.Canceled;
    this.person = {
      firstName: data && data.person ? data.person.firstName : '',
      lastName: data && data.person ? data.person.lastName : '',
      phone: data && data.person ? data.person.phone : '',
      gender: data && data.person && data.person.gender ? data.person.gender : undefined,
      birthday: data && data.person ? data.person.birthday : ''
    };
  }

  public get userProfileForm(): IUserProfileForm {
    return {
      avatarBase64: this.avatar,
      email: this.email,
      firstName: this.person.firstName,
      lastName: this.person.lastName,
      phone: this.person.phone,
      birthday: this.person.birthday,
      gender: this.person.gender
    };
  }
}
