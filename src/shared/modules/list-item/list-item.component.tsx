import React, { FC } from 'react';

import { Button, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

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
          {onDelete && <Button shape="circle" icon={<DeleteOutlined />} onClick={onDelete} />}
          {onEdit && <Button shape="circle" icon={<EditOutlined />} onClick={onEdit} />}
          {onDetail && <Button shape="circle" icon={<EyeOutlined />} onClick={onDetail} />}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
