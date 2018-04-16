import React from 'react';
import { connect } from 'react-redux';

import { startAddShipment} from '../actions/index';
import Form from './form';

const AddShipment = (props) => (
      <div>
      <Form
        onSubmit={(article)=>{
          //Dispatch the action to edit the expenses//
          //redirect to the dashboard
          props.dispatch(startAddShipment(article));
          props.history.push('/');
        }}
        />
      </div>
    );

module.exports = connect()(AddShipment);
