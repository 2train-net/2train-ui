import React, { FC, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Layout, Drawer } from 'antd';

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
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpened(!isDrawerOpened);
  };

  const sidebar = (
    <Sidebar
      role={user?.type}
      pathname={pathname}
      isSidebarCollapsed={isSidebarCollapsed}
      setIsSidebarCollapsed={setIsSidebarCollapsed}
    />
  );

  return isAuthenticated && user ? (
    <Layout className={classes.root}>
      {sidebar}
      <Drawer
        placement="left"
        closable={false}
        onClose={handleToggleDrawer}
        visible={isDrawerOpened}
        className={classes.drawer}
      >
        {sidebar}
      </Drawer>
      <Layout>
        <Header>
          <Navbar handleOpenDrawer={handleToggleDrawer} />
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  ) : (
    <></>
  );
};

export default Navigation;
