import { CreateProfile } from 'modules/auth/shared/model';

export class UserService {
  public get(): Promise<CreateProfile | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(new CreateProfile({ firstName: 'Anthony', lastName: 'Soto', birthday: '', phone: '' }));
        // resolve(null);
      }, 2000);
    });
  }

  public create(data: CreateProfile): Promise<CreateProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    });
  }
}

const instance = new UserService();

export default instance;
