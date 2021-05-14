import { Gender } from 'shared/generated';

export class UserService {
  parseGender = (gender: Gender) => {
    return gender === 'MALE' ? 'Masculino' : gender === 'FEMALE' ? 'Femenino' : 'Reservado';
  };

  getAvatarLetters = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };
}

const instance = new UserService();

export default instance;
