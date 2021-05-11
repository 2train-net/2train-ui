import React, { FC } from 'react';

import { Tabs } from 'antd';

import ListItem, { IListItem } from 'shared/modules/list-item/list-item.component';

const { TabPane } = Tabs;

interface IItemList extends IListItem {
  key: string;
}

interface IItemListTab {
  tabs: string[];
  onChange?: (tab: string) => any;
  itemList?: IItemList[];
  tabBarStyle?: React.CSSProperties;
}
// TODO ADD EMPTY SECTION WHEN itemList.length === 0
const ItemListTab: FC<IItemListTab> = ({ tabs, itemList = [], tabBarStyle, onChange }) => {
  return (
    <Tabs defaultActiveKey={tabs[0]} onChange={onChange} tabBarStyle={tabBarStyle}>
      {tabs.map(label => (
        <TabPane tab={label} key={`${label}-tab`}>
          {itemList.map(({ key, title, description, onEdit, onDetail, onDelete }) => (
            <ListItem
              key={key}
              title={title}
              description={description}
              onEdit={onEdit}
              onDetail={onDetail}
              onDelete={onDelete}
            />
          ))}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default ItemListTab;
