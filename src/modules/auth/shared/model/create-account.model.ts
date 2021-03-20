import { ICredentials } from 'shared/model';
import { UserType, UserCreateInput, UserStatus } from 'shared/generated/graphql-schema';

export interface ICreateAccountData extends ICredentials {
  type: UserType;
  firstName: string;
  lastName: string;
  phone: string;
  confirmPassword: string;
}

interface ICreateProfile {
  get: ICreateAccountData;
  create: UserCreateInput;
  credentials: { email: string; password: string; type: UserType };
}

export class CreateAccount implements ICreateProfile {
  public readonly type: UserType;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phone: string;
  public readonly email: string;
  public readonly password: string;
  public readonly confirmPassword: string;

  constructor(data: ICreateAccountData) {
    this.type = data.type;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.email = data.email;
    this.password = data.password;
    this.confirmPassword = data.confirmPassword;
  }

  get get() {
    return {
      type: this.type,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
  }

  get create(): any {
    return {
      email: this.email,
      status: UserStatus.Confirmed,
      type: {
        connect: {
          id: this.type
        }
      },
      person: {
        create: {
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone
        }
      }
    };
  }

  get credentials() {
    return {
      type: this.type,
      email: this.email,
      password: this.password
    };
  }
}
