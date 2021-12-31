import React, { FC } from 'react';

import { ClientCard, IClientPayload } from 'modules/clients/clients.module';

import { MasterList } from 'shared/modules';
import { ClientWhereInput, useGetClientsQuery } from 'shared/generated';
import { SINGULAR_CLIENTS_TITLE, PLURAL_CLIENTS_TITLE } from '../shared/constants';
import { EMAIL_TEXT, FIRST_NAME_TEXT, LAST_NAME_TEXT, PHONE_TEXT } from 'shared/constants';

const ClientList: FC = () => {
  return (
    <MasterList<IClientPayload, ClientWhereInput>
      title={[SINGULAR_CLIENTS_TITLE, PLURAL_CLIENTS_TITLE]}
      render={ClientCard}
      useQuery={useGetClientsQuery}
      filters={[
        { label: EMAIL_TEXT, value: 'email' },
        { label: LAST_NAME_TEXT, value: 'lastName' },
        { label: FIRST_NAME_TEXT, value: 'firstName' },
        { label: PHONE_TEXT, value: 'phone' },
      ]}
    />
  );
};

export default ClientList;
