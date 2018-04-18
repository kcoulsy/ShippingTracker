import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addArticle, startEditShipment, removeArticle, startRemoveShipment } from '../actions/index';
import Form from './Form';

const EditPage = (props) => {
  console.log('props', props)
  return (
    <div>
      <Link to="/">Dashboard</Link>
      <Form article={props.article}
        onSubmit={(article)=>{
          //Dispatch the action to edit the expenses//
          //redirect to the dashboard
          props.dispatch(startEditShipment(article));
          props.history.push('/');
        }}
        />
        <button onClick={() => {
          console.log('props.match.params.id', props.match.params.id);
          startRemoveShipment({id: props.match.params.id});
          props.history.push('/');
          }}
          >Remove</button>
    </div>
  );
}

const mapStateToProps = (state, props) => {
   return {
     article: state.articles.find((article) => article._id === props.match.params.id)
   };
};
export default connect(mapStateToProps)(EditPage);
