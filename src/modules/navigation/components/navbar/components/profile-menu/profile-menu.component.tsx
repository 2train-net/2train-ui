import React from 'react';

import { Menu } from 'antd';

const { Item } = Menu;

const ProfileMenu = (
  <Menu>
    <Item>
      <a href="/">Account</a>
    </Item>
    <Item>
      <a href="/">Logout</a>
    </Item>
  </Menu>
);

export default ProfileMenu;
