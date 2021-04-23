import React, { FC } from 'react';

import { IPlanPayload } from 'modules/plans/shared/model';

import Status from 'shared/modules/status/status.component';
import ListCard from 'shared/modules/list-card/list-card.component';
import { IMasterComponent } from 'shared/modules/master-list/master-list.util';

interface IPlanCard extends IMasterComponent<IPlanPayload> {
  data: IPlanPayload;
}

const PlanCard: FC<IPlanCard> = ({ data }) => {
  return (
    <ListCard
      uuid={data.uuid}
      title={
        <>
          <Status status={data.status} />
          <span style={{ marginLeft: 10 }}>{`${data.name}`}</span>
        </>
      }
      description={`${data.currency} ${data.price} | ${data.intervalCount} ${data.intervalPlan}`}
    />
  );
};

export default PlanCard;
