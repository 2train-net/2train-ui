import React, { FC } from 'react';

import { Button, Typography } from 'antd';

import { Icon } from 'shared/modules';

import useStyles from './list-item.style';

export interface IListItem {
  title: string;
  description: string;
  onEdit?: () => any;
  onDetail?: () => any;
  onDelete?: () => any;
}

const { Text } = Typography;

const ListItem: FC<IListItem> = ({ title, description, onEdit, onDetail, onDelete }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="list-item-content">
        <div className="list-item-text">
          <Text strong>{title}</Text>
          <Text type="secondary">{description}</Text>
        </div>
        <div className="list-item-actions">
          {onDelete && <Button shape="circle" icon={<Icon type="delete" />} onClick={onDelete} />}
          {onEdit && <Button shape="circle" icon={<Icon type="edit" />} onClick={onEdit} />}
          {onDetail && <Button shape="circle" icon={<Icon type="view" />} onClick={onDetail} />}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
