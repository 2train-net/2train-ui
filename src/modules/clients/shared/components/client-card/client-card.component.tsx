import React, { FC } from 'react';

import { IClientPayload } from 'modules/clients/clients.module';

import { Avatar } from 'shared/modules';
import ListCard from 'shared/modules/list-card/list-card.component';

import { IMasterComponent } from 'shared/modules/master-list/master-list.util';

interface IClientCard extends IMasterComponent<IClientPayload> {
  data: IClientPayload;
}

const ClientCard: FC<IClientCard> = ({ data }) => {
  return (
    <ListCard
      uuid={data.uuid}
      title={`${data.firstName} ${data.lastName}`}
      description={`
        ${data.email}
        ${data.phone}
      `}
      leftContent={<Avatar size="large" url={data.avatar} letter={data.firstName.charAt(0).toUpperCase()} />}
      isEditActionEnabled={false}
      isDeleteActionEnabled={false}
    />
  );
};

export default ClientCard;
