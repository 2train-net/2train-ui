import React, { FC } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { ShareAltOutlined } from '@ant-design/icons';

import { IPlanPayload } from 'modules/plans/shared/model';

import Status from 'shared/modules/status/status.component';
import ListCard from 'shared/modules/list-card/list-card.component';
import { IMasterComponent } from 'shared/modules/master-list/master-list.util';

interface IPlanCard extends IMasterComponent<IPlanPayload> {
  data: IPlanPayload;
}

const PlanCard: FC<IPlanCard> = ({ data }) => {
  const location = useLocation();
  const history = useHistory();

  const redirect = history.push;
  const { pathname } = location;

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
      isViewActionEnabled={false}
      actions={[<ShareAltOutlined key="share" onClick={() => redirect(`${pathname}/invite/${data.uuid}`)} />]}
    />
  );
};

export default PlanCard;
