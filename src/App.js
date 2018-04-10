import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store/store';
import { addArticle } from './actions/index.js';
import BigList from './components/BigList';

window.store = store;
window.addArticle = addArticle;

const App = () => {
  return (
    <Provider store={store}>
      <BigList />
    </Provider>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
