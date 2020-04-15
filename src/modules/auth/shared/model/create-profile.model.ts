type Gender = 'MALE' | 'FEMALE';

export interface ICreateProfileData {
  avatar?: string;
  firstName: string;
  lastName: string;
  birthday: string;
  phone: string;
  gender?: Gender;
}

interface ICreateProfile {
  get: ICreateProfileData;
}

export class CreateProfile implements ICreateProfile {
  public readonly avatar?: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly birthday: string;
  public readonly phone: string;
  public readonly gender?: Gender;

  constructor(data: ICreateProfileData) {
    this.avatar = data.avatar;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.birthday = data.birthday;
    this.phone = data.phone;
    this.gender = data.gender;
  }

  get get() {
    return {
      avatar: this.avatar,
      firstName: this.firstName,
      lastName: this.lastName,
      birthday: this.birthday,
      phone: this.phone,
      gender: this.gender
    };
  }
}
