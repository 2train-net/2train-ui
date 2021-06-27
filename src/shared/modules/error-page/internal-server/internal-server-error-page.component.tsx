import React, { FC } from 'react';

import { Result } from 'antd';

import { Button } from 'shared/modules';
import { ROOT } from 'shared/routes';

const InternalServalErrorPage: FC = () => {
  const reload = () => {
    window.location.replace(ROOT);
  };

  return (
    <Result
      status="500"
      title="500"
      subTitle="Hubo un error inesperado, nuestro equipo esta trabajando en resolverlo pronto."
      extra={
        <Button size="medium" color="secondary" onClick={reload}>
          Volver al inicio
        </Button>
      }
    />
  );
};

export default InternalServalErrorPage;
