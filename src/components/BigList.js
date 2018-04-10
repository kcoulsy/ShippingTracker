
import React from "react";

import Form from './Form';
import List from "./List";

const BigList = () => (
  <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
    <h2>Articles</h2>
      <List />
      <Form />
    </div>
  </div>
);
export default BigList;
