import React, { FC } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { PageHeader, Row, Col, Button, Descriptions, Tabs, Statistic } from 'antd';

import { BODY_MEASURES, BODY_MEASURE_EDIT, WORKOUT_ROUTINE } from 'shared/routes';
import { BodyMeasureTabs } from 'modules/body-measure/shared/model';

interface IBodyMeasureHeader {
  tab: BodyMeasureTabs;
  loading: boolean;
  setTab: (tab: BodyMeasureTabs) => void;
  bodyMeasure: {
    customer: {
      id: string;
      person: {
        firstName: string;
        lastName: string;
        age: number;
        gender: string;
      };
    };
    status: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  routineDay: number;
  routineTotalDays: number;
}

const { Item } = Descriptions;
const { TabPane } = Tabs;

const BodyMeasureHeader: FC<IBodyMeasureHeader> = ({
  tab,
  setTab,
  bodyMeasure: {
    customer: {
      id,
      person: { firstName, lastName, age, gender }
    },
    status,
    notes,
    createdAt,
    updatedAt
  },
  routineDay,
  routineTotalDays
}) => {
  const history = useHistory();

  const onBack = () => history.push(BODY_MEASURES);

  return (
    <PageHeader
      ghost={false}
      onBack={onBack}
      title={`${firstName} ${lastName}`}
      subTitle={`ID: ${id.toUpperCase()}`}
      extra={[
        <Link key="action-header-1" to={WORKOUT_ROUTINE}>
          <Button>Check Routine</Button>
        </Link>,
        <Link key="action-header-2" to={BODY_MEASURE_EDIT}>
          <Button type="primary">Edit</Button>
        </Link>
      ]}
      footer={
        <Tabs defaultActiveKey={tab} onChange={setTab as any}>
          <TabPane tab="Information" key={BodyMeasureTabs.INFORMATION} />
          <TabPane tab="Statistics" key={BodyMeasureTabs.STATISTICS} />
          <TabPane tab="Pictures" key={BodyMeasureTabs.BODY_PICTURES} />
        </Tabs>
      }
    >
      <Row gutter={16}>
        <Col md={24} lg={18}>
          <Descriptions size="small" column={{ xs: 1, sm: 2, lg: 4 }}>
            <Item label="Age">{age}</Item>
            <Item label="Gender">{gender}</Item>
            <Item label="Created at">{createdAt.toLocaleString()}</Item>
            <Item label="Updated at">{updatedAt.toLocaleString()}</Item>
            <Item label="Notes">{notes}</Item>
          </Descriptions>
        </Col>
        <Col sm={24} lg={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Statistic
            title="Status"
            value={status}
            style={{
              marginRight: 46
            }}
          />
          <Statistic title="Day" value={routineDay} suffix={`/ ${routineTotalDays}`} />
        </Col>
      </Row>
    </PageHeader>
  );
};

export default BodyMeasureHeader;
