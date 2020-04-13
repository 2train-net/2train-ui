export interface IProfileInfo {
  avatar?: string;
  firstName: string;
  lastName: string;
}

interface IProfile {
  info: IProfileInfo;
}

export class Profile implements IProfile {
  private avatar?: string;
  private firstName: string;
  private lastName: string;

  constructor({ avatar, firstName, lastName }: IProfileInfo) {
    this.avatar = avatar;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get info(): IProfileInfo {
    return { avatar: this.avatar, firstName: this.firstName, lastName: this.lastName };
  }

  get getAvatar(): string | undefined {
    return this.avatar;
  }

  get getFirstName(): string {
    return this.firstName;
  }
}
