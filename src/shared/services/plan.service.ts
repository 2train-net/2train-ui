import { ACTIVE_TEXT, INACTIVE_TEXT } from 'shared/constants';
import { PlanStatus } from 'shared/generated';

const planStatus = {
  [PlanStatus.Active]: ACTIVE_TEXT,
  [PlanStatus.Inactive]: INACTIVE_TEXT
};

export class PlanService {
  parseStatus = (status: PlanStatus) => {
    return planStatus[status] || status;
  };
}

const instance = new PlanService();

export default instance;
