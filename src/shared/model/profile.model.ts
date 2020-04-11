export interface IProfileInfo {
  firstName: string;
  lastName: string;
}

interface IProfile {
  info: IProfileInfo;
}

export class Profile implements IProfile {
  private firstName: string;
  private lastName: string;

  constructor({ firstName, lastName }: IProfileInfo) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get info(): IProfileInfo {
    return { firstName: this.firstName, lastName: this.lastName };
  }
}
