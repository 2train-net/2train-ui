import { UserType, ICredentials } from 'shared/model';

export interface ICreateAccountData extends ICredentials {
  type: UserType;
  confirmPassword: string;
}

interface ICreateProfile {
  get: ICreateAccountData;
}

export class CreateAccount implements ICreateProfile {
  public readonly type: UserType;
  public readonly email: string;
  public readonly password: string;
  public readonly confirmPassword: string;

  constructor(data: ICreateAccountData) {
    this.type = data.type;
    this.email = data.email;
    this.password = data.password;
    this.confirmPassword = data.confirmPassword;
  }

  get get() {
    return {
      type: this.type,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
  }
}
