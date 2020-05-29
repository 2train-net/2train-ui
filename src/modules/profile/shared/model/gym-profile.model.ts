import { UserStatus, Gender } from 'shared/generated/graphql-schema';

export interface IGymProfileForm {
  avatarBase64: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday: string;
  gender?: Gender;
  company: string;
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
    birthday: string;
  };

  constructor(data?: IGymProfileQuery) {
    if (data && data.gym) {
      this.uuid = data.gym!.uuid;
      this.email = data.email;
      this.name = data.gym!.name;
      this.avatar = data.avatar || '';
      this.status = data.status;
      this.branches = data.gym!.branches || [];
      this.owner = {
        firstName: data.person!.firstName,
        lastName: data.person!.lastName,
        phone: data.person!.phone,
        gender: data.person!.gender || undefined,
        birthday: data.person!.birthday || ''
      };
    } else {
      this.uuid = '';
      this.email = '';
      this.name = '';
      this.avatar = '';
      this.status = UserStatus.Canceled;
      this.branches = [];
      this.owner = {
        firstName: '',
        lastName: '',
        phone: '',
        gender: undefined,
        birthday: ''
      };
    }
  }

  public get form(): IGymProfileForm {
    return {
      avatarBase64: this.avatar,
      email: this.email,
      firstName: this.owner.firstName,
      lastName: this.owner.lastName,
      phone: this.owner.phone,
      birthday: this.owner.birthday,
      gender: this.owner.gender,
      company: this.name
    };
  }
}
