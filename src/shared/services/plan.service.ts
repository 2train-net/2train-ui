import { PlanStatus } from 'shared/generated';

const planStatus = {
  [PlanStatus.Active]: 'Activo',
  [PlanStatus.Inactive]: 'Inactivo'
};

export class PlanService {
  parseStatus = (status: PlanStatus) => {
    return planStatus[status] || status;
  };
}

const instance = new PlanService();

export default instance;
