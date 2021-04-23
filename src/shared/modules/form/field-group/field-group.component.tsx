import React, { FC } from 'react';

import useStyles from './field-group.style';

const FieldGroup: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default FieldGroup;
