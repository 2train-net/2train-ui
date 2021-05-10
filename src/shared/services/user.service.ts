import { Gender } from 'shared/generated';

export class UserService {
  parseGender = (gender: Gender) => {
    return gender === 'MALE' ? 'Masculino' : gender === 'FEMALE' ? 'Femenino' : 'Reservado';
  };
}

const instance = new UserService();

export default instance;
