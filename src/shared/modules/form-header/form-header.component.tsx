import React, { FC, ReactNode } from 'react';

import { useHistory } from 'react-router-dom';

import { PageHeader } from 'antd';

interface IFormHeader {
  title: string;
  actions?: ReactNode[];
}

const FormHeader: FC<IFormHeader> = ({ title, actions }) => {
  const { goBack } = useHistory();

  return <PageHeader ghost={false} title={title} onBack={goBack} extra={actions} className="page-header" />;
};

export default FormHeader;
