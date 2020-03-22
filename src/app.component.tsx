import React, { FC } from 'react';
import { Route } from 'react-router-dom';

import Navigation from 'modules/navigation/navigation.module';
import Home from 'modules/home/home.module';

import { ROOT } from 'shared/routes';

import './app.css';

const App: FC = () => (
  <Navigation>
    <Route exact path={ROOT} component={Home} />
  </Navigation>
);

export default App;
