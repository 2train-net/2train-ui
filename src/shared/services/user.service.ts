import {
  PERSONAL_TRAINER_TEXT,
  CUSTOMER_TEXT,
  MALE_TEXT,
  FEMALE_TEXT,
  OTHER_TEXT,
  PREFER_NOT_TO_SAY_GENDER_TEXT
} from 'shared/constants';
import { Gender, UserType } from 'shared/generated';

export class UserService {
  parseUserType = (type: UserType) => {
    return type === 'PERSONAL_TRAINER' ? PERSONAL_TRAINER_TEXT : CUSTOMER_TEXT;
  };

  parseGender = (gender: Gender) => {
    return gender === 'MALE'
      ? MALE_TEXT
      : gender === 'FEMALE'
      ? FEMALE_TEXT
      : gender === 'NOT_SPECIFIED'
      ? PREFER_NOT_TO_SAY_GENDER_TEXT
      : OTHER_TEXT;
  };

  getAvatarLetters = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };
}

const instance = new UserService();

export default instance;
