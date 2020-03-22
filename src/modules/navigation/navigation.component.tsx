import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const Navigation: FC = ({ children }) => (
  <Router>
    <main>{children}</main>
  </Router>
);

export default Navigation;
