import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import EditPage from '../components/EditPage';
import NotFoundPage from '../components/NotFoundPage';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>

    <Switch>
      <PublicRoute path="/" component={LoginPage} exact={true}/>
      <PrivateRoute path="/dashboard" component={Dashboard}/>
      <Route path='/edit/:id' component={EditPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
