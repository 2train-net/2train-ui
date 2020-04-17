interface ICognitoUser {
  email: string;
  roles: string[];
  isVerified: boolean;
}

export class CognitoUser implements ICognitoUser {
  public readonly email: string;
  public readonly roles: string[];
  public readonly isVerified: boolean;

  constructor(payload: any) {
    this.email = payload.username;
    this.roles = payload.signInUserSession.accessToken.payload['cognito:groups'];
    this.isVerified = payload.attributes.email_verified;
  }
}
