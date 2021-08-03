import React, { FC, ReactNode } from 'react';

import { Button, Typography } from 'antd';

import Icon, { IconType } from 'shared/modules/icon/icon.component';

import useStyles from './list-item.style';

export interface IListItem {
  icon?: IconType;
  title: string;
  description?: string;
  actions?: ReactNode[];
  emptyActions?: boolean;
  isDetailActionEnabled?: boolean;
  isDetailButtonDisabled?: boolean;
  isEditActionEnabled?: boolean;
  isDeleteActionEnabled?: boolean;
  onEdit?: () => any;
  onDetail?: () => any;
  onDelete?: () => any;
  hideLeftLine?: boolean;
}

const { Text } = Typography;

const ListItem: FC<IListItem> = ({
  icon,
  title,
  description,
  emptyActions = false,
  actions = [],
  isDetailButtonDisabled = false,
  isDetailActionEnabled = true,
  isEditActionEnabled = false,
  isDeleteActionEnabled = false,
  onEdit,
  onDetail,
  onDelete,
  hideLeftLine = false
}) => {
  const centerContent = !description;

  const classes = useStyles({ centerContent, hideLeftLine });

  const itemActions: ReactNode[] = actions;

  if (!emptyActions) {
    if (isDeleteActionEnabled) {
      itemActions.push(<Button shape="circle" icon={<Icon type="delete" />} onClick={onDelete} />);
    }

    if (isEditActionEnabled) {
      itemActions.push(<Button shape="circle" icon={<Icon type="edit" />} onClick={onEdit} />);
    }

    if (isDetailActionEnabled) {
      itemActions.push(
        <Button
          shape="circle"
          icon={<Icon type={isDetailButtonDisabled ? 'unableView' : 'view'} />}
          onClick={onDetail}
          disabled={isDetailButtonDisabled}
        />
      );
    }
  }

  return (
    <div className={classes.root}>
      <div className="list-item-content">
        <div className="list-item-text">
          {icon && <Icon type={icon} className="icon" />}
          <Text strong>{title}</Text>
          {description && <Text type="secondary">{description}</Text>}
        </div>
        <div className="list-item-actions">
          {itemActions.map((action, index) => (
            <div key={index}>{action}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
