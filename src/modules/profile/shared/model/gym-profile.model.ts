import { UserStatus, Gender } from 'shared/generated/graphql-schema';

export interface IGymProfileForm {
  avatarBase64: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday?: string;
  gender?: Gender;
}

export interface IGymProfileQuery {
  email: string;
  avatar?: string | null;
  status: UserStatus;
  person?: {
    firstName: string;
    lastName: string;
    phone: string;
    gender?: Gender | null;
    birthday?: string;
  };
  gym?: {
    uuid: string;
    name: string;
    branches?: Array<{
      uuid: string;
      address?: {
        country: string;
      };
    }> | null;
  };
}

export class GymProfile {
  public readonly uuid: string;
  public readonly email: string;
  public readonly name: string;
  public readonly avatar: string;
  public readonly status: UserStatus;
  public readonly branches: Array<{
    uuid: string;
    address?: {
      country: string;
    };
  }>;
  public readonly owner: {
    firstName: string;
    lastName: string;
    phone: string;
    gender?: Gender;
    birthday?: string;
  };

  constructor(data?: IGymProfileQuery) {
    this.uuid = data && data.gym ? data.gym.uuid : '';
    this.email = data ? data.email : '';
    this.name = data && data.gym ? data.gym.name : '';
    this.avatar = (data && data.avatar) || '';
    this.status = data ? data.status : UserStatus.Canceled;
    this.branches = data && data.gym && data.gym.branches ? data.gym.branches : [];
    this.owner = {
      firstName: data && data.person ? data.person.firstName : '',
      lastName: data && data.person ? data.person.lastName : '',
      phone: data && data.person ? data.person.phone : '',
      gender: data && data.person && data.person.gender ? data.person.gender : undefined,
      birthday: data && data.person ? data.person.birthday : ''
    };
  }

  public get form(): IGymProfileForm {
    return {
      avatarBase64: this.avatar,
      email: this.email,
      firstName: this.owner.firstName,
      lastName: this.owner.lastName,
      phone: this.owner.phone,
      birthday: this.owner.birthday,
      gender: this.owner.gender
    };
  }
}
