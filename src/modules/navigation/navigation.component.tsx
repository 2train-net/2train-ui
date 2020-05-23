import React, { FC, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Layout } from 'antd';

import Navbar from './components/navbar/navbar.component';
import Sidebar from './components/sidebar/sidebar.component';

import { AuthContext } from 'shared/contexts';

import useStyles from './navigation.style';

const { Header, Content } = Layout;

const Navigation: FC = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const classes = useStyles({ isSidebarCollapsed });
  const { pathname } = useLocation();
  const { user, isAuthenticated } = useContext(AuthContext);

  return isAuthenticated && user ? (
    <Layout className={classes.root}>
      <Sidebar
        pathname={pathname}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
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
