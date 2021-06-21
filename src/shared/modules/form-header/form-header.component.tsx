import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';

import { PageHeader } from 'antd';

interface IFormHeader {
  title: string;
}

const FormHeader: FC<IFormHeader> = ({ title }) => {
  const { goBack } = useHistory();

  return <PageHeader className="page-header" ghost={false} onBack={goBack} title={title} />;
};

export default FormHeader;
