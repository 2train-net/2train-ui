import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/navbar/navbar.component';

const Navigation: FC = ({ children }) => (
  <Router>
    <Navbar />
    <main>{children}</main>
  </Router>
);

export default Navigation;
