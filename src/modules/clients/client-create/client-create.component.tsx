import React, { FC } from 'react';

import { Redirect } from 'react-router-dom';

import { PLAN_INVITATION_ADD } from 'shared/routes';

const ClientCreate: FC = () => {
  return <Redirect to={PLAN_INVITATION_ADD} />;
};

export default ClientCreate;
