import React, { FC } from 'react';

import { Card } from 'antd';

import { ChangePassword, ACCOUNT_SETTINGS_TITLE } from 'modules/settings/settings.module';

const SettingsLayout: FC = () => {
  return (
    <Card title={ACCOUNT_SETTINGS_TITLE} bordered>
      <ChangePassword />
    </Card>
  );
};

export default SettingsLayout;
