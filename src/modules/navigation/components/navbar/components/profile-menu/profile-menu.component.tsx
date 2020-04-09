import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

import { LOGIN } from 'shared/routes';

const { Item } = Menu;

const ProfileMenu = (
  <Menu>
    <Item>
      <Link to={LOGIN}>Logout</Link>
    </Item>
  </Menu>
);

export default ProfileMenu;
