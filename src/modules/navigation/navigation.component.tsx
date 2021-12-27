import React, { FC, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Layout, Drawer } from 'antd';

import { Navbar, Sidebar, UserGuide, UserGuideProgress, USER_GUIDE_TEXT } from './navigation.module';

import { CREATE_PLAN_TITLE } from 'modules/plans/plans.module';
import { CREATE_PLAN_INVITATION_TITLE } from 'modules/plan-invitations/plan-invitations.module';

import { Fab } from 'shared/modules';
import { AuthContext } from 'shared/contexts';
import { UserType } from 'shared/generated';
import { PLAN_ADD, PLAN_INVITATION_ADD } from 'shared/routes';

import useStyles from './navigation.style';

const { Header, Content } = Layout;

const Navigation: FC = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const classes = useStyles({ isSidebarCollapsed });

  const { pathname } = useLocation();
  const { user, isAuthenticated } = useContext(AuthContext);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserGuideOpen, setIsUserGuideOpen] = useState(false);

  const isPersonalTrainer = user?.type === UserType.PersonalTrainer;

  const userGuideProgress: UserGuideProgress = {
    isCreatePlanStepCompleted: !!user?.progress?.hasPlans,
    isInviteClientStepCompleted: !!user?.progress?.hasPlanInvitations
  };

  const isUserGuideCompleted = !Object.values(userGuideProgress).filter(isStepCompleted => !isStepCompleted).length;
  const isUserGuideEnabled = isPersonalTrainer && !isUserGuideCompleted;

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleToggleUserGuide = () => {
    setIsUserGuideOpen(!isUserGuideOpen);
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
        visible={isDrawerOpen}
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
      {isUserGuideEnabled ? (
        <Fab icon="rocket" className="user-guide-fab" onClick={handleToggleUserGuide} />
      ) : (
        <Fab
          icon="plus"
          className="user-guide-fab"
          actions={[
            { label: USER_GUIDE_TEXT, icon: 'rocket', onClick: handleToggleUserGuide },
            { label: CREATE_PLAN_TITLE, icon: 'book', url: PLAN_ADD },
            { label: CREATE_PLAN_INVITATION_TITLE, icon: 'mail', url: PLAN_INVITATION_ADD }
          ]}
        />
      )}
      <Drawer
        title={USER_GUIDE_TEXT}
        placement="right"
        className={classes.userGuide}
        onClose={handleToggleUserGuide}
        visible={isUserGuideOpen}
      >
        <UserGuide userGuideProgress={userGuideProgress} onClose={handleToggleUserGuide} />
      </Drawer>
    </Layout>
  ) : (
    <></>
  );
};

export default Navigation;
