import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Layout } from 'antd';

import Navbar from './components/navbar/navbar.component';
import Sidebar from './components/sidebar/sidebar.component';

import useStyles from './navigation.style';

const { Header, Content } = Layout;

const Navigation: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Router>
      <Layout className={classes.root}>
        <Sidebar />
        <Layout>
          <Header>
            <Navbar />
          </Header>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Navigation;
