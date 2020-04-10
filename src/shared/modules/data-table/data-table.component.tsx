import React, { FC, useState } from 'react';

import { Table, Button } from 'antd';
import { ReloadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import useStyles from './data-table.style';

interface IColumn {
  title: string;
  dataIndex: string;
}

interface IDataTable {
  data: any[];
  total: number;
  loading: boolean;
  columns: IColumn[];
  handleAddItem: () => void;
  handleEditItem: () => void;
  handleDeleteItems: () => void;
  onRefresh: (keys: string[] | number[]) => void;
  onPaginationChange: (page: number, pageSize?: number) => void;
  onPaginationSizeChange: (current: number, size: number) => void;
}

const DataTable: FC<IDataTable> = ({
  data,
  total,
  loading,
  columns,
  onRefresh,
  handleAddItem,
  handleEditItem,
  handleDeleteItems,
  onPaginationChange,
  onPaginationSizeChange
}) => {
  const classes = useStyles();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[] | number[]>([]);
  const selectedAmount = selectedRowKeys.length;

  const handleSelectChange = (selectedRowKeys: any[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleRefresh = () => {
    onRefresh(selectedRowKeys);
    setSelectedRowKeys([]);
  };

  return (
    <div className={classes.root}>
      <div className="data-table-actions">
        <div>
          <Button type="default" onClick={handleRefresh} disabled={!selectedAmount || loading}>
            <ReloadOutlined />
          </Button>
          {!!selectedAmount && <span>{`Selected ${selectedAmount} items`}</span>}
        </div>
        <div>
          <Button type="default" onClick={handleEditItem} disabled={selectedAmount !== 1 || loading}>
            <EditOutlined />
          </Button>
          <Button type="default" onClick={handleDeleteItems} disabled={!selectedAmount || loading}>
            <DeleteOutlined />
          </Button>
          <Button type="default" onClick={handleAddItem} disabled={loading}>
            <PlusOutlined />
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          total,
          showSizeChanger: true,
          pageSizeOptions: ['10', '25', '50'],
          onChange: onPaginationChange,
          onShowSizeChange: onPaginationSizeChange
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectChange
        }}
      />
    </div>
  );
};

export default DataTable;
