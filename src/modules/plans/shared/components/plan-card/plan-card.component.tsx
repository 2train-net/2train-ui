import React, { FC, useContext } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { ShareAltOutlined } from '@ant-design/icons';

import { IPlanPayload } from 'modules/plans/shared/model';

import { Status, ListCard } from 'shared/modules';
import { IMasterComponent } from 'shared/modules/master-list/master-list.util';
import { AuthContext } from 'shared/contexts';
import { UserType } from 'shared/generated';

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
      ? [<ShareAltOutlined key="share" onClick={() => redirect(`${pathname}/invite/${data.uuid}`)} />]
      : [];

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
      isDetailActionEnabled={user?.type === UserType.Customer}
      isEditActionEnabled={user?.type === UserType.PersonalTrainer}
      isDeleteActionEnabled={user?.type === UserType.PersonalTrainer}
      actions={actions}
    />
  );
};

export default PlanCard;
