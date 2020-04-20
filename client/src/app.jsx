import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './app.css';

import { Home } from './containers/home';
import { Auth } from './containers/auth';
import { Workshop } from './containers/workshop';
import { Analytics } from './containers/analytics';
import { Tasks } from './containers/tasks';
import { Customers } from './containers/customers';
import { Transactions } from './containers/transactions';
import { Connections } from './containers/connections';
import { Metodology } from './containers/metodology';
import { routes } from './routes';

export const App = () => {
  return (
    <div className="app">
      <Suspense fallback={'loading...'}>
        <Router>
          <Switch>
            <Route
              path={routes.home.path}
              exact={true}
              component={Home}
            />
            <Route
              path={routes.auth.path}
              exact={true}
              component={Auth}
            />
            <Route
              path={routes.workshop.path}
              exact={true}
              component={Workshop}
            />
            <Route
              path={routes.analytics.path}
              exact={true}
              component={Analytics}
            />
            <Route
              path={routes.tasks.path}
              exact={true}
              component={Tasks}
            />
            <Route
              path={routes.customers.path}
              exact={true}
              component={Customers}
            />
            <Route
              path={routes.transactions.path}
              exact={true}
              component={Transactions}
            />
            <Route
              path={routes.connections.path}
              exact={true}
              component={Connections}
            />
            <Route
              path={routes.metodology.path}
              exact={true}
              component={Metodology}
            />
          </Switch>
        </Router>
      </Suspense>
    </div >
  );
};

export default App;
