import React, { FC, useContext } from 'react';

import { Badge, Button, Dropdown, Menu, Popover } from 'antd';

import { NotificationList, NotificationHeader } from 'modules/notifications/notifications.module';

import { Avatar, Icon } from 'shared/modules';
import { UserService } from 'shared/services';
import { EXIT_TEXT } from 'shared/constants';
import { AuthContext, NotificationContext } from 'shared/contexts';

import useStyles from './navbar.style';

const { Item } = Menu;
interface INavbar {
  handleOpenDrawer: () => any;
}

const Navbar: FC<INavbar> = ({ handleOpenDrawer }) => {
  const classes = useStyles();

  const { user, logout } = useContext(AuthContext);
  const { isOpen, isBadgeVisible, count, toggleModal, readAllNotifications, clearNewNotifications } = useContext(
    NotificationContext
  );

  const notificationHeader = <NotificationHeader readAllNotifications={readAllNotifications} />;
  const notificationButton = <Button shape="circle" icon={<Icon type="bell" />} onClick={clearNewNotifications} />;

  return (
    <div className={classes.root}>
      <Icon type="menu" className="menu-icon" onClick={handleOpenDrawer} />

      <Popover
        visible={isOpen}
        trigger="click"
        placement="bottomRight"
        title={notificationHeader}
        content={NotificationList}
        onVisibleChange={toggleModal}
        overlayClassName={`notifications-card ${classes.notificationsCard}`}
        overlayInnerStyle={{ overflowY: 'scroll', paddingBottom: 64 }}
      >
        {isBadgeVisible ? (
          <Badge count={count || ' '} className={`notification-badge ${count ? '' : classes.notificationMiniBadge}`}>
            {notificationButton}
          </Badge>
        ) : (
          notificationButton
        )}
      </Popover>

      <Dropdown
        overlay={
          <Menu>
            <Item onClick={logout}>{EXIT_TEXT}</Item>
          </Menu>
        }
        placement="bottomLeft"
      >
        <Avatar
          url={user?.avatar}
          letter={user && UserService.getAvatarLetters(user.firstName, user.lastName)}
          className="nav-item"
        />
      </Dropdown>
    </div>
  );
};

export default Navbar;
