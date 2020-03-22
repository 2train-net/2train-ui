import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Layout } from 'antd';

import Navbar from './components/navbar/navbar.component';

const { Header, Content, Footer } = Layout;

const Navigation: FC = ({ children }) => (
  <Router>
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>{children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  </Router>
);

export default Navigation;
