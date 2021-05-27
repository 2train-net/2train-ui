import React, { FC, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { IPlanInvitationPayload } from 'modules/plan-invitations/plan-invitations.module';

import { Avatar } from 'shared/modules';
import { ListCard } from 'shared/modules';
import { AuthContext } from 'shared/contexts';
import { UserService } from 'shared/services';
import { DETAIL, INVITE, PLANS, PLAN_INVITATIONS } from 'shared/routes';

import { IMasterComponent } from 'shared/modules/master-list/master-list.util';
import { UserType } from 'shared/generated';

interface IPlanInvitationCard extends IMasterComponent<IPlanInvitationPayload> {
  data: IPlanInvitationPayload;
}

const PlanInvitationCard: FC<IPlanInvitationCard> = ({ data }) => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const redirect = history.push;

  const url = data.link ? `${PLANS}/${DETAIL}/${data.link}` : `${PLAN_INVITATIONS}/${INVITE}/${data.uuid}`;

  const isCustomer = user?.type === UserType.Customer;

  const profile = isCustomer ? data.plan.owner : data.user;

  const status = data.link ? 'Aceptada' : 'Pendiente';

  return (
    <ListCard
      uuid={data.uuid}
      title={`${profile.firstName} ${profile.lastName}`}
      description={`${data.plan.name} (${status})`}
      leftContent={
        <Avatar
          size="large"
          url={profile.avatar}
          letter={UserService.getAvatarLetters(profile.firstName, profile.lastName)}
        />
      }
      isDeleteActionEnabled={false}
      isEditActionEnabled={false}
      isDetailActionEnabled={isCustomer}
      onDetail={() => redirect(url)}
    />
  );
};

export default PlanInvitationCard;
