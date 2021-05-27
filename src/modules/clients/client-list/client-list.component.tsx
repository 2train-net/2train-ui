import React, { FC } from 'react';

import { ClientCard, IClientPayload } from 'modules/clients/clients.module';

import { MasterList } from 'shared/modules';
import { useGetClientsQuery } from 'shared/generated';
import { SINGULAR_CLIENTS_TITLE, PLURAL_CLIENTS_TITLE } from '../shared/constants';

const ClientList: FC = () => {
  return (
    <MasterList<IClientPayload>
      title={[SINGULAR_CLIENTS_TITLE, PLURAL_CLIENTS_TITLE]}
      render={ClientCard}
      isCreateButtonAvailable={false}
      useQuery={useGetClientsQuery}
    />
  );
};

export default ClientList;
