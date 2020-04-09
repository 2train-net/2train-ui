import React, { useState } from 'react';

import { Layout, Menu } from 'antd';

import { OPTIONS } from './sidebar.util';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['home']} mode="inline">
        {OPTIONS.map(({ route, title, Icon, children }) =>
          children ? (
            <SubMenu
              key={route}
              title={
                <span>
                  <Icon />
                  <span>{title}</span>
                </span>
              }
            >
              {children && children.map(child => <Item key={child.route}>{child.title}</Item>)}
            </SubMenu>
          ) : (
            <Item key={route}>
              <Icon />
              <span>{title}</span>
            </Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
