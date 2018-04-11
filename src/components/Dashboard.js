import React from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import List from "./List";

const Dashboard = (props) => (
  <div>

    <Form
      onSubmit={(article)=>{
        //Dispatch the action to edit the expenses//
        //redirect to the dashboard
        props.dispatch(addArticle(article));
        props.history.push('/');
      }}
      />
    <List />
  </div>
);

export default connect()(Dashboard);
