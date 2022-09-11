import React, { FC } from 'react';

import { ClientCard, IClientPayload } from 'modules/clients/clients.module';

import { MasterList } from 'shared/modules';
import { ClientWhereInput, useGetClientsQuery } from 'shared/generated';
import { SINGULAR_CLIENTS_TITLE, PLURAL_CLIENTS_TITLE } from '../shared/constants';

const ClientList: FC = () => {
  return (
    <MasterList<IClientPayload, ClientWhereInput>
      title={[SINGULAR_CLIENTS_TITLE, PLURAL_CLIENTS_TITLE]}
      render={ClientCard}
      useQuery={useGetClientsQuery}
    />
  );
};

export default ClientList;
