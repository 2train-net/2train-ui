import React, { FC } from 'react';

import * as Sentry from '@sentry/react';

import { InternalServerErrorPage } from 'shared/modules/error-page';

const ErrorBoundary: FC = ({ children }) => {
  return <Sentry.ErrorBoundary fallback={InternalServerErrorPage}>{children}</Sentry.ErrorBoundary>;
};

export default ErrorBoundary;
