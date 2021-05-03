import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';

import { EyeOutlined } from '@ant-design/icons';

import { IPlanInvitationPayload } from 'modules/plan-invitations/plan-invitations.module';

import ListCard from 'shared/modules/list-card/list-card.component';
import { IMasterComponent } from 'shared/modules/master-list/master-list.util';
import { DETAIL, INVITE, PLANS, PLAN_INVITATIONS } from 'shared/routes';

interface IPlanInvitationCard extends IMasterComponent<IPlanInvitationPayload> {
  data: IPlanInvitationPayload;
}

const PlanInvitationCard: FC<IPlanInvitationCard> = ({ data }) => {
  const history = useHistory();

  const redirect = history.push;

  const url = data.link ? `${PLANS}/${DETAIL}/${data.link}` : `${PLAN_INVITATIONS}/${INVITE}/${data.uuid}`;

  return (
    <ListCard
      emptyActions
      uuid={data.uuid}
      title={data.plan.name}
      description={data.link ? 'Aceptada' : 'Pendiente'}
      actions={[<EyeOutlined key="detail" onClick={() => redirect(url)} />]}
    />
  );
};

export default PlanInvitationCard;
