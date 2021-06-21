import React, { FC } from 'react';

import { Card } from 'antd';

import { FormHeader } from 'shared/modules';

import useStyles from './form-page.style';

interface IFormPage {
  title: string;
}

const FormPage: FC<IFormPage> = ({ children, title }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormHeader title={title} />
      <Card className="form-content">{children}</Card>
    </div>
  );
};

export default FormPage;
