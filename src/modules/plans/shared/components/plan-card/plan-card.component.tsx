import React, { FC } from 'react';

import { Card } from 'antd';
import { DeleteOutlined, ShareAltOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import { IMasterComponent } from 'shared/modules/master-list/master-list.util';

import { IPlanPayload } from 'modules/plans/shared/model';

interface IPlanCard extends IMasterComponent<IPlanPayload> {
  data: IPlanPayload;
}

const { Meta } = Card;

const PlanCard: FC<IPlanCard> = ({ data }) => {
  return (
    <Card
      style={{ width: 300 }}
      actions={[
        <ShareAltOutlined key="share" />,
        <DeleteOutlined key="delete" />,
        <EditOutlined key="edit" />,
        <EyeOutlined key="detail" />
      ]}
    >
      <Meta
        title={`${data.currency} ${data.price} | ${data.intervalCount} ${data.intervalPlan}`}
        description={`${data.description} | ${data.scope} | ${data.status}`}
      />
    </Card>
  );
};

export default PlanCard;
