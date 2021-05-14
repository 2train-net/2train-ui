import moment from 'moment';

export class DateService {
  format = (date: Date | string, format: string = 'DD-MM-YYYY') => {
    return moment(date).format(format);
  };

  difference = (from: Date, to: Date, unit: moment.unitOfTime.Diff) => {
    return moment(from).diff(moment(to), unit);
  };
}

const instance = new DateService();

export default instance;
