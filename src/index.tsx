import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloProvider } from '@apollo/react-hooks';

import App from './app.component';

import { client } from 'shared/config';

import * as serviceWorker from './service-worker';

import './index.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.register({
  onUpdate: (registration: ServiceWorkerRegistration) => {
    try {
      const { waiting } = registration;

      waiting?.postMessage({ type: 'SKIP_WAITING' });
      window?.location?.reload();
    } catch (error) {}
  }
});
