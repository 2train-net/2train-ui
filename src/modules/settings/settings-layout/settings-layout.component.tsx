import React, { FC } from 'react';

import { Card, Col, Divider, Row, Typography } from 'antd';

import { ChangePassword, ACCOUNT_SETTINGS_TITLE } from 'modules/settings/settings.module';

const { Title } = Typography;

const SettingsLayout: FC = () => {
  return (
    <Card bordered>
      <Row gutter={24}>
        <Col span={24}>
          <Title level={3}>{ACCOUNT_SETTINGS_TITLE}</Title>
          <Divider />
          <br />
          <ChangePassword />
        </Col>
      </Row>
    </Card>
  );
};

export default SettingsLayout;
