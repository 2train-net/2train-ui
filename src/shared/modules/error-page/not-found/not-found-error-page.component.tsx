import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Result } from 'antd';

import { Button } from 'shared/modules';
import { HOME } from 'shared/routes';

const NotFoundErrorPage: FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo lamento, la página que intentas visitar no existe"
      extra={
        <Link to={HOME}>
          <Button size="small" color="secondary">
            Volver al inicio
          </Button>
        </Link>
      }
    />
  );
};

export default NotFoundErrorPage;
