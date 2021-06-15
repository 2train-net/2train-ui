import React, { FC, useContext } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { IPlanPayload } from 'modules/plans/shared/model';

import { Icon, Status, ListCard } from 'shared/modules';
import { AuthContext } from 'shared/contexts';
import { UserType } from 'shared/generated';
import { PlanService } from 'shared/services';

import { IMasterComponent } from 'shared/modules/master-list/master-list.util';

interface IPlanCard extends IMasterComponent<IPlanPayload> {
  data: IPlanPayload;
}

const PlanCard: FC<IPlanCard> = ({ data }) => {
  const history = useHistory();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const redirect = history.push;
  const { pathname } = location;

  const actions =
    user?.type === UserType.PersonalTrainer
      ? [<Icon type="share" onClick={() => redirect(`${pathname}/invite/${data.uuid}`)} />]
      : [];

  const price = `${data.currency} ${data.price}`;
  const interval = `
    ${data.intervalCount} 
    ${PlanService.parseIntervalByCount(data.intervalCount, data.intervalPlan)}
  `;

  return (
    <ListCard
      uuid={data.uuid}
      title={
        <>
          <Status status={data.status} />
          <span style={{ marginLeft: 10 }}>{`${data.name}`}</span>
        </>
      }
      description={`${price} | ${interval}`}
      isDetailActionEnabled={user?.type === UserType.Customer}
      isEditActionEnabled={user?.type === UserType.PersonalTrainer}
      isDeleteActionEnabled={user?.type === UserType.PersonalTrainer}
      actions={actions}
    />
  );
};

export default PlanCard;
