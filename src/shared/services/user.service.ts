import { Profile } from 'shared/model';

export class UserService {
  public get(): Promise<Profile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(new Profile({ firstName: 'Anthony', lastName: 'Soto ' }));
      }, 2000);
    });
  }
}

const instance = new UserService();

export default instance;
