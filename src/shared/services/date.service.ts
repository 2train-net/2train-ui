import moment from 'moment';

export class DateService {
  format = (date: Date | string, format: string) => {
    return moment(date).format(format);
  };
}

const instance = new DateService();

export default instance;
