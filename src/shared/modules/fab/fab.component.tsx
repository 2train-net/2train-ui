import React, { FC, useState } from 'react';

import { Link } from 'react-router-dom';

import { Tooltip } from 'antd';

import { Icon, Button } from 'shared/modules';
import { IconType } from 'shared/modules/icon/icon.component';

import useStyles from './fab.style';

interface FabAction {
  label: string;
  url?: string;
  icon: IconType;
  onClick?: () => any;
}

interface IFloatingActionButton {
  icon?: IconType;
  className?: string;
  onClick?: () => any;
  actions?: FabAction[];
}

const FloatingActionButton: FC<IFloatingActionButton> = ({ icon = 'plus', className = '', actions, onClick }) => {
  const classes = useStyles();

  const [isActionListVisible, setIsActionListVisible] = useState(false);

  const onActionsMenuOpen = () => setIsActionListVisible(true);

  const onActionsMenuClose = () => setIsActionListVisible(false);

  const onFabClick = actions ? onActionsMenuOpen : onClick;

  return (
    <div className={classes.root} onMouseLeave={onActionsMenuClose}>
      <Button className={className} onClick={onFabClick}>
        <Icon type={icon} />
      </Button>
      {actions && (
        <ul>
          {actions.map((action, index) => (
            <Tooltip key={`tooltip-${index}`} placement="left" title={action.label}>
              <li
                key={`action-${index}`}
                onClick={action.onClick}
                className={isActionListVisible ? 'fade-in' : 'fade-out'}
              >
                {action.url ? (
                  <Link to={action.url} className="action-link">
                    <Icon type={action.icon} />
                  </Link>
                ) : (
                  <span className="action-link">
                    <Icon type={action.icon} />
                  </span>
                )}
              </li>
            </Tooltip>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FloatingActionButton;
