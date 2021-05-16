import React, { FC } from 'react';

import { Redirect } from 'react-router';
import { PROFILE } from 'shared/routes';

const Home: FC = () => <Redirect to={PROFILE} />;

export default Home;
