import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import { OPTIONS } from './sidebar.util';

import LOGO from 'shared/assets/images/logo/logo-horizontal-full-color.png';
import SYMBOL from 'shared/assets/images/symbol/symbol-full-color.png';

import { PERMISSIONS } from 'shared/routes';
import { UserType } from 'shared/generated';

import useStyles from './sidebar.style';
import { Icon } from 'shared/modules';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

interface ISidebar {
  role?: UserType;
  pathname: string;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (isSidebarCollapsed: boolean) => void;
}

const Sidebar: FC<ISidebar> = ({ role, pathname, isSidebarCollapsed, setIsSidebarCollapsed }) => {
  const classes = useStyles();
  const [, parent, child] = pathname.split('/');
  const match = [`/${parent}`, `/${parent}${child ? `/${child}` : ''}`];

  const options = role ? OPTIONS.filter(({ route }) => !!PERMISSIONS[route].some(match => match === role)) : [];

  const handleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={classes.root}>
      <Sider collapsible collapsed={isSidebarCollapsed} onCollapse={handleCollapse}>
        <div className="logo">
          {isSidebarCollapsed ? (
            <img src={SYMBOL} className="symbol" alt="symbol" />
          ) : (
            <img src={LOGO} className="logomark" alt="logomark" />
          )}
        </div>
        <Menu theme="dark" selectedKeys={match} mode="inline">
          {options.map(({ route, title, icon, children }) =>
            children ? (
              <SubMenu
                key={route}
                title={
                  <span>
                    {icon && <Icon type={icon} />}
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
                  {icon && <Icon type={icon} />}
                  <span>{title}</span>
                </Link>
              </Item>
            )
          )}
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
