import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import { OPTIONS } from './sidebar.util';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

interface ISidebar {
  pathname: string;
}

const Sidebar: FC<ISidebar> = ({ pathname }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [, parent, child] = pathname.split('/');
  const match = `/${parent}${child ? `/${child}` : ''}`;

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <div className="logo" />
      <Menu theme="dark" selectedKeys={[match]} mode="inline">
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
              {children &&
                children.map(child => <Item key={child.route}>{<Link to={child.route}>{child.title}</Link>}</Item>)}
            </SubMenu>
          ) : (
            <Item key={route}>
              <Link to={route}>
                <Icon />
                <span>{title}</span>
              </Link>
            </Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
