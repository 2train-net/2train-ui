import React, { FC, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { Layout } from 'antd';

import Navbar from './components/navbar/navbar.component';
import Sidebar from './components/sidebar/sidebar.component';

import useStyles from './navigation.style';
import { AuthContext } from 'shared/contexts';

const { Header, Content } = Layout;

const Navigation: FC = ({ children }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { profile } = useContext(AuthContext);

  return profile ? (
    <Layout className={classes.root}>
      <Sidebar pathname={pathname} />
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  ) : (
    <></>
  );
};

export default Navigation;
