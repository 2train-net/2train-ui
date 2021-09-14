import React, { FC, ReactNode } from 'react';

import { Card } from 'antd';

import { FormHeader } from 'shared/modules';

import useStyles from './form-page.style';

interface IFormPage {
  title: string;
  className?: string;
  isCardContentEnable?: boolean;
  actions?: ReactNode[];
}

const FormPage: FC<IFormPage> = ({ children, title, actions, className = '', isCardContentEnable = true }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${className}`}>
      <FormHeader title={title} actions={actions} />
      {isCardContentEnable ? <Card className="form-content">{children}</Card> : children}
    </div>
  );
};

export default FormPage;
