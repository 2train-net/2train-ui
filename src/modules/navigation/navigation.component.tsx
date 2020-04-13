import React, { FC, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Layout } from 'antd';

import Navbar from './components/navbar/navbar.component';
import Sidebar from './components/sidebar/sidebar.component';

import useStyles from './navigation.style';
import { AuthContext } from 'shared/contexts';

const { Header, Content } = Layout;

const Navigation: FC = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const classes = useStyles({ isSidebarCollapsed });
  const { pathname } = useLocation();
  const { isAuthenticated, profile } = useContext(AuthContext);

  return isAuthenticated && profile ? (
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
