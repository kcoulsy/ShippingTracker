import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store/store';
import { addArticle } from './actions/index.js';
import AppRouter from './routers/AppRouter';

window.store = store;
window.addArticle = addArticle;


const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
