import React, { FC, ReactNode } from 'react';

import { Button, Typography } from 'antd';

import { Icon } from 'shared/modules';

import useStyles from './list-item.style';

export interface IListItem {
  title: string;
  description: string;
  actions?: ReactNode[];
  emptyActions?: boolean;
  isDetailActionEnabled?: boolean;
  isEditActionEnabled?: boolean;
  isDeleteActionEnabled?: boolean;
  onEdit?: () => any;
  onDetail?: () => any;
  onDelete?: () => any;
}

const { Text } = Typography;

const ListItem: FC<IListItem> = ({
  title,
  description,
  emptyActions = false,
  actions = [],
  isDetailActionEnabled = true,
  isEditActionEnabled = false,
  isDeleteActionEnabled = false,
  onEdit,
  onDetail,
  onDelete
}) => {
  const classes = useStyles();

  const itemActions: ReactNode[] = actions;

  if (!emptyActions) {
    if (isDeleteActionEnabled) {
      itemActions.push(<Button shape="circle" icon={<Icon type="delete" />} onClick={onDelete} />);
    }

    if (isEditActionEnabled) {
      itemActions.push(<Button shape="circle" icon={<Icon type="edit" />} onClick={onEdit} />);
    }

    if (isDetailActionEnabled) {
      itemActions.push(<Button shape="circle" icon={<Icon type="view" />} onClick={onDetail} />);
    }
  }

  return (
    <div className={classes.root}>
      <div className="list-item-content">
        <div className="list-item-text">
          <Text strong>{title}</Text>
          <Text type="secondary">{description}</Text>
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
