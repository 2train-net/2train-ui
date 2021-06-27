import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import { ApolloProvider } from '@apollo/client';

import App from './app.component';

import { client } from 'shared/config';

import * as config from '../package.json';
import * as serviceWorker from './service-worker';

import './index.css';

const { NODE_ENV, REACT_APP_SENTRY_URL } = process.env;

const isProduction = NODE_ENV === 'production';
const isStaging = NODE_ENV === 'development';

Sentry.init({
  tracesSampleRate: 1.0,
  environment: NODE_ENV,
  dsn: REACT_APP_SENTRY_URL,
  integrations: [new Integrations.BrowserTracing()],
  release: `${config.name}-${config.version}`,
  beforeSend: event => (isProduction || isStaging ? event : null)
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate: (registration: ServiceWorkerRegistration) => {
    try {
      const { waiting } = registration;

      waiting?.postMessage({ type: 'SKIP_WAITING' });
      window?.location?.reload();
    } catch (error) {}
  }
});
