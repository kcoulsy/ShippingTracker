import React from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../authentication/authenticate';

export default class Header extends React.Component {
  startLogout(){
    logout();
  }
  render(){
    return(
      <header >
        <div >
          <div>
            <Link to="/dashboard" ><h1>Shipping tracker</h1></Link>
            <button onClick={this.startLogout}>Logout</button>
          </div>
        </div>
      </header>
    )
  }

};
