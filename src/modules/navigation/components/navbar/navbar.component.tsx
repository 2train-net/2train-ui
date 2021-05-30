import React, { FC, useContext } from 'react';

import { Dropdown, Menu } from 'antd';

import { Avatar, Icon } from 'shared/modules';
import { AuthContext } from 'shared/contexts';

import useStyles from './navbar.style';
import { UserService } from 'shared/services';

const { Item } = Menu;

interface INavbar {
  handleOpenDrawer: () => any;
}

const Navbar: FC<INavbar> = ({ handleOpenDrawer }) => {
  const classes = useStyles();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <Icon type="menu" className="menu-icon" onClick={handleOpenDrawer} />
      <Dropdown
        overlay={
          <Menu>
            <Item onClick={logout}>Salir</Item>
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
