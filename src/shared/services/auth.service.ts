import { Auth } from 'aws-amplify';

import { CreateAccount } from 'modules/auth/shared/model/create-account.model';

import { AuthError } from 'shared/errors';
import { AuthCredentials, CognitoUser } from 'shared/model';

export class AuthService {
  public async getCognitoUser(): Promise<CognitoUser> {
    try {
      const response = await this.getAuthenticatedUser();

      return new CognitoUser(response);
    } catch (error) {
      console.error(error);
      throw new AuthError();
    }
  }

  public async login({ credentials: { email, password } }: AuthCredentials): Promise<void> {
    try {
      await Auth.signIn({ username: email, password });
    } catch (error) {
      console.error(error);

      throw new AuthError(error.name);
    }
  }

  public async logout(): Promise<void> {
    try {
      await Auth.signOut();
    } catch (error) {
      throw new AuthError();
    }
  }

  public async register({ email, password, type }: CreateAccount): Promise<void> {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email
        }
      });
    } catch (error) {
      throw new AuthError();
    }
  }

  public async confirmSignUp(email: string, code: string): Promise<void> {
    try {
      await Auth.confirmSignUp(email, code);
    } catch (error) {
      throw new AuthError();
    }
  }

  public async forgotPassword(email: string): Promise<void> {
    try {
      await Auth.forgotPassword(email);
    } catch (error) {
      throw new AuthError();
    }
  }

  public async forgotPasswordSubmit(email: string, code: string, password: string) {
    try {
      return Auth.forgotPasswordSubmit(email, code, password);
    } catch (error) {
      throw new AuthError();
    }
  }

  public async getJWToken() {
    try {
      const clientToken = await this.getClientToken();
      return clientToken ? clientToken.getJwtToken() : null;
    } catch (error) {
      return null;
    }
  }

  private async getClientToken() {
    try {
      const user = await this.getAuthenticatedUser();
      const userSession = user.getSignInUserSession();
      return userSession ? userSession.getIdToken() : null;
    } catch (error) {
      throw new AuthError();
    }
  }

  private async getAuthenticatedUser(): Promise<any> {
    return Auth.currentAuthenticatedUser({ bypassCache: false });
  }
}

const instance = new AuthService();

export default instance;
