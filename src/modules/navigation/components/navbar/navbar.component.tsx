import React, { FC } from 'react';

import { Tooltip, Button, Badge, Avatar, Dropdown } from 'antd';
import { SettingFilled, BellFilled } from '@ant-design/icons';

import ProfileMenu from './components/profile-menu/profile-menu.component';

import useStyles from './navbar.style';

const Navbar: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title="Settings" className="nav-item">
        <Button shape="circle" icon={<SettingFilled />} />
      </Tooltip>
      <Tooltip title="Notifications" className="nav-item">
        <Badge count={5}>
          <Button shape="circle" icon={<BellFilled />} />
        </Badge>
      </Tooltip>
      <Dropdown overlay={ProfileMenu} placement="bottomLeft">
        <Avatar size="default" className="nav-item">
          A
        </Avatar>
      </Dropdown>
    </div>
  );
};

export default Navbar;
