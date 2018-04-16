import React from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import List from "./List";

const Dashboard = (props) => (
<div className="container">
  <List />
</div>
);

export default connect()(Dashboard);
