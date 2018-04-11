import React from 'react'
import uuidv1 from "uuid";
import { connect } from "react-redux";

import { addArticle } from "../actions/index";

class ConnectedForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: props.article ? props.article.date : '',
      name: props.article ? props.article.name : '',
      contents: props.article ? props.article.contents : '',
      shippingCost: props.article ? props.article.shippingCost : '',
      tracking: props.article ? props.article.tracking : '',
      status: props.article ? props.article.status : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    this.setState({[e.target.id]: e.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    const { date,name,contents,shippingCost,tracking,status } = this.state;
    const id = this.props.article ? this.props.article.id : uuidv1();
    this.props.onSubmit({id,date,name,contents,shippingCost,tracking,status});
    this.setState({
      date: '',
      name: '',
      contents: '',
      shippingCost: '',
      tracking: '',
      status: ''
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            id="date"
            value={this.state.date}
            onChange={this.handleChange}
            placeholder="date"
            />
          <input
            type="text"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="name"
            />
          <input
            type="text"
            id="contents"
            value={this.state.contents}
            onChange={this.handleChange}
            placeholder="contents"
            />
          <input
            type="text"
            id="shippingCost"
            value={this.state.shippingCost}
            onChange={this.handleChange}
            placeholder="DHL Cost"
            />
          <input
            type="text"
            id="tracking"
            value={this.state.tracking}
            onChange={this.handleChange}
            placeholder="Tracking"
            />
          <input
            type="text"
            id="status"
            value={this.state.status}
            onChange={this.handleChange}
            placeholder="Status"
            />
        </div>
        <button type="submit">Save</button>
      </form>

    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
};

const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;
