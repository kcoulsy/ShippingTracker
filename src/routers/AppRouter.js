import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import Dashboard from '../components/Dashboard';
import EditPage from '../components/EditPage';
import NotFoundPage from '../components/NotFoundPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>

    <Switch>
      <Route path="/" component={Dashboard} exact={true} />
      <Route path='/edit/:id' component={EditPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
