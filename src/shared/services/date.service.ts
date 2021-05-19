import moment from 'moment';

import { DEFAULT_DATE_FORMAT } from 'shared/constants';

export class DateService {
  format = (
    date: Date | string,
    outputFormat: string = DEFAULT_DATE_FORMAT,
    inputFormat: string = DEFAULT_DATE_FORMAT
  ) => {
    return moment(date, inputFormat).format(outputFormat);
  };

  difference = (from: Date, to: Date, unit: moment.unitOfTime.Diff) => {
    return moment(from).diff(moment(to), unit);
  };

  add = (date: Date | string, amount: number, unit: moment.unitOfTime.Diff, format: string = DEFAULT_DATE_FORMAT) => {
    return moment(date)
      .add(amount, unit)
      .format(format);
  };
}

const instance = new DateService();

export default instance;
