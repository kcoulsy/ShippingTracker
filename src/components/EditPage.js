import React from 'react';
import { connect } from 'react-redux';
import { addArticle, editArticle, removeArticle } from '../actions/index';
import Form from './Form';

const EditPage = (props) => {
  console.log(props)
  return (
    <div>
      <h2>{props.article._id}</h2>
      <Form article={props.article}
        onSubmit={(article)=>{
          //Dispatch the action to edit the expenses//
          //redirect to the dashboard
          props.dispatch(editArticle(article));
          props.history.push('/');
        }}
        />
        <button onClick={() => {
          props.dispatch(removeArticle({id: props.article.id}));
          props.history.push('/');
          }}
          >Remove</button>
    </div>
  );
}

const mapStateToProps = (state, props) => {
   return {
     article: state.articles.find((article) => article.id === props.match.params.id)
   };
};
export default connect(mapStateToProps)(EditPage);
