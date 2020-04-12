import React, { FC, useContext } from 'react';

import { Tooltip, Button, Badge, Avatar, Dropdown, Menu } from 'antd';
import { BellFilled } from '@ant-design/icons';

import { AuthContext } from 'shared/contexts';

import useStyles from './navbar.style';

const { Item } = Menu;

const Navbar: FC = () => {
  const classes = useStyles();
  const { logout } = useContext(AuthContext);

  return (
    <div className={classes.root}>
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
        <Avatar size="default" className="nav-item">
          A
        </Avatar>
      </Dropdown>
    </div>
  );
};

export default Navbar;
