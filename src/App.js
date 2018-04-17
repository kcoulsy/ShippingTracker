import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store/store';
import { addArticle } from './actions/index.js';
import AppRouter from './routers/AppRouter';

import {login, register, loggedIn, getSession} from './authentication/authenticate';

import LoginPage from './components/LoginPage';

import 'bootstrap/dist/css/bootstrap.min.css';
getSession();


register('kristian@coulsy.co.uk', 'password');
window.store = store;
window.addArticle = addArticle;

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
//<AppRouter />
export default App;

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(<App />, document.getElementById('app'));
    hasRendered = true;
  }
}
//render loading page while nothing is showing
ReactDOM.render(<App />, document.getElementById('app'));

//
// //check logged ins
// firebase.auth().onAuthStateChanged((user)=>{
//   if(user){
//     store.dispatch(login(user.uid));
//     store.dispatch(startSetExpenses()).then(()=>{
//       renderApp();
//       if(history.location.pathname === '/') {
//         history.push('/dashboard');
//       }
//     });
//   }else {
//     store.dispatch(logout());
//     renderApp();
//     history.push('/');
//   }
// });
