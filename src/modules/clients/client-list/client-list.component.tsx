import React, { FC } from 'react';

import { ClientCard, IClientPayload } from 'modules/clients/clients.module';

import { MasterList } from 'shared/modules';
import { useGetClientsQuery } from 'shared/generated';

const ClientList: FC = () => {
  return (
    <MasterList<IClientPayload>
      title="Clients"
      render={ClientCard}
      isCreateButtonAvailable={false}
      useQuery={useGetClientsQuery}
    />
  );
};

export default ClientList;
