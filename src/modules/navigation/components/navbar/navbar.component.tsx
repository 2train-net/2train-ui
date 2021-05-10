import React, { FC, useContext } from 'react';

import { Tooltip, Button, Badge, Dropdown, Menu } from 'antd';
import { BellFilled, MenuOutlined } from '@ant-design/icons';

import { Avatar } from 'shared/modules';
import { AuthContext } from 'shared/contexts';

import useStyles from './navbar.style';

const { Item } = Menu;

interface INavbar {
  handleOpenDrawer: () => any;
}

const Navbar: FC<INavbar> = ({ handleOpenDrawer }) => {
  const classes = useStyles();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <MenuOutlined className="menu-icon" onClick={handleOpenDrawer} />
      <Tooltip title="Notifications" className="nav-item">
        <Badge count={5}>
          <Button shape="circle" icon={<BellFilled />} />
        </Badge>
      </Tooltip>
      <Dropdown
        overlay={
          <Menu>
            <Item onClick={logout}>Logout</Item>
          </Menu>
        }
        placement="bottomLeft"
      >
        <Avatar url={user?.avatar} letter={user?.firstName.charAt(0).toUpperCase()} className="nav-item" />
      </Dropdown>
    </div>
  );
};

export default Navbar;
