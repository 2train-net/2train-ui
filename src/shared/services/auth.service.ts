import { AuthCredentials } from 'shared/model';
import { ICredentials } from 'shared/model';

export class AuthService {
  public verifyToken = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  public login({ credentials }: AuthCredentials): Promise<ICredentials> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(credentials);
      }, 2000);
    });
  }

  public logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}

const instance = new AuthService();

export default instance;
