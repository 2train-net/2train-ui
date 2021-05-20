import moment from 'moment';

import { DEFAULT_DATE_FORMAT } from 'shared/constants';
import { IntervalPlan } from 'shared/generated';

const durationDictionary = {
  [IntervalPlan.Day]: 'days',
  [IntervalPlan.Week]: 'weeks',
  [IntervalPlan.Month]: 'months',
  [IntervalPlan.Year]: 'years'
};

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
    return moment(date, DEFAULT_DATE_FORMAT)
      .add(amount, unit)
      .format(format);
  };

  parseDuration = (type: IntervalPlan): moment.unitOfTime.Diff => {
    return durationDictionary[type] as moment.unitOfTime.Diff;
  };
}

const instance = new DateService();

export default instance;
