import { UserType } from 'shared/generated/graphql-schema';

export interface ICreateAccountFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  type: UserType;
}

export interface ICreateAccountData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  type: UserType;
}

interface ICreateAccount {
  data: ICreateAccountData;
}

export class CreateAccount implements ICreateAccount {
  public readonly email: string;
  public readonly password: string;
  public readonly username: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phone: string;
  public readonly type: UserType;

  constructor(data: ICreateAccountFormValues) {
    this.email = data.email;
    this.password = data.password;
    this.username = data.username;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.type = data.type;
  }

  get data() {
    return {
      email: this.email,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      type: this.type
    };
  }

  get credentials() {
    return {
      email: this.email,
      password: this.password
    };
  }
}
