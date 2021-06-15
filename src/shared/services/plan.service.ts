import {
  ACTIVE_TEXT,
  INACTIVE_TEXT,
  DAY_TEXT,
  DAYS_TEXT,
  MONTH_TEXT,
  MONTHS_TEXT,
  WEEK_TEXT,
  WEEKS_TEXT,
  YEAR_TEXT,
  YEARS_TEXT
} from 'shared/constants';
import { PlanStatus, IntervalPlan } from 'shared/generated';

const planStatus = {
  [PlanStatus.Active]: ACTIVE_TEXT,
  [PlanStatus.Inactive]: INACTIVE_TEXT
};

const singularPlanInterval = {
  [IntervalPlan.Day]: DAY_TEXT,
  [IntervalPlan.Week]: WEEK_TEXT,
  [IntervalPlan.Month]: MONTH_TEXT,
  [IntervalPlan.Year]: YEAR_TEXT
};

const pluralPlanInterval = {
  [IntervalPlan.Day]: DAYS_TEXT,
  [IntervalPlan.Week]: WEEKS_TEXT,
  [IntervalPlan.Month]: MONTHS_TEXT,
  [IntervalPlan.Year]: YEARS_TEXT
};

export class PlanService {
  parseStatus = (status: PlanStatus) => {
    return planStatus[status] || status;
  };

  parseInterval = (interval: IntervalPlan) => {
    return singularPlanInterval[interval] || interval;
  };

  parseIntervalByCount = (count: number, interval: IntervalPlan) => {
    return count === 1 ? singularPlanInterval[interval] : pluralPlanInterval[interval];
  };
}

const instance = new PlanService();

export default instance;
