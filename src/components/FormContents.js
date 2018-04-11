import React from 'react';

class FormContents extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      index: this.props.index,
      name: this.props.name ? this.props.name : '',
      variation: this.props.name ? this.props.variation : '',
      qty: this.props.name ? this.props.qty :  0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e){
    this.setState({[e.target.id]: e.target.value});
    this.props.onChange({
      index: this.state.index,
      name: this.state.name,
      variation: this.state.variation,
      qty: this.state.qty
    });
  };

  render(){
    return (
      <div>
        <input
          type="text"
          id="name"
          placeholder="Product"
          value={this.state.name}
          onChange={this.handleChange}
          />
        <input
          type="text"
          id="variation"
          placeholder="Variation"
          value={this.state.variation}
          onChange={this.handleChange}
          />
        <input
          type="number"
          id="qty"
          placeholder="Qty"
          value={this.state.qty}
          onChange={this.handleChange}
          />
      </div>)
  }
}

export default FormContents;
