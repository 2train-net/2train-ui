import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Result, Button } from 'antd';
import { HOME } from 'shared/routes';

const NotFoundErrorPage: FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to={HOME}>
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default NotFoundErrorPage;
