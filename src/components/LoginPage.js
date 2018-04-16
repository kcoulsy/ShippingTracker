import React from 'react';
import {login, getSession} from '../authentication/authenticate';

export default class LoginPage extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    getSession();
  }
  handleChange (e){
    this.setState({[e.target.id]: e.target.value});
  };
  // This will be called when the user clicks on the login button
  onLogin(e) {
    e.preventDefault();
    // Here, we call an external AuthService. We’ll create it in the next step
    login(this.state.email, this.state.password);
  }

  render() {
    return (
      <div>
        <form role="form">
        <div className="form-group">
          <input
            id="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email" />
          <input
            id="password"
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
            placeholder="Password" />
        </div>
        <button type="submit" onClick={this.onLogin.bind(this)}>Submit</button>
      </form>
    </div>
    )
  }
}
