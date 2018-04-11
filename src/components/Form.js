import React from 'react';
import uuidv1 from "uuid";
import { connect } from "react-redux";
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { addArticle } from "../actions/index";
import FormContents from './FormContents';

class ConnectedForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: props.article ? moment(props.article.date) : moment(),
      focused: false,
      name: props.article ? props.article.name : '',
      contents: props.article ? props.article.contents : [{}],
      shippingCost: props.article ? props.article.shippingCost : 0.00,
      tracking: props.article ? props.article.tracking : '',
      status: props.article ? props.article.status : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleAddContentsFields = this.handleAddContentsFields.bind(this);
    this.handleContentsChange = this.handleContentsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  handleChange (e){
    this.setState({[e.target.id]: e.target.value});
  };
  handleAmountChange (e) {
    const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState({ shippingCost: amount });
    }
  };
  handleContentsChange (e) {
    let newContents = this.state.contents.map((content, index)=>{
      if(index === e.index){
        return e;
      }
      return content;
    });
    this.setState({contents: newContents});
  }
  handleAddContentsFields (e) {
    e.preventDefault();
    const oldContent = this.state.contents;
    const newContents = oldContent.concat([{}]);
    this.setState({contents: [...newContents]})
  }
  handleSubmit(event) {

    event.preventDefault();
    const { date,name,contents,shippingCost,tracking,status } = this.state;
    const id = this.props.article ? this.props.article.id : uuidv1();
    const article = {
      id,
      date: date.valueOf(),
      name,
      contents,
      shippingCost,
      tracking,
      status
    }
    console.log(article);
    this.props.onSubmit(article);
    this.setState({
      date: moment(),
      name: '',
      contents: [],
      shippingCost: 0.00,
      tracking: '',
      status: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h3>Details</h3>
          <div>
          <SingleDatePicker
            date={this.state.date}
            onDateChange={date => {
              if(date){
                this.setState({ date });
              }
            }}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            />
          </div>
          <input
            type="text"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="name"
            />
          <input
            type="text"
            id="shippingCost"
            value={this.state.shippingCost}
            onChange={this.handleAmountChange}
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
        <div>
          <h3>Contents</h3>
          {this.state.contents.map((content, index)=>{
            return (
              <FormContents
                key={index}
                onChange={this.handleContentsChange}
                index={index}
                name={this.state.contents[index].name}
                variation={this.state.contents[index].variation}
                qty={this.state.contents[index].qty}
                />)
          })}
          <button onClick={this.handleAddContentsFields}>Add Another</button>
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
