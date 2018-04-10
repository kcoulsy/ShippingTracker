import React from "react";
import { connect } from "react-redux";

const ConnectedList = ({ articles }) => (
  <ul className="list-group list-group-flush">
    {articles.map(el => (
      <li key={el.id}>
        <ul>
          <li>{el.date}</li>
          <li>{el.name}</li>
          <li>{el.contents}</li>
          <li>{el.shippingCost}</li>
          <li>{el.tracking}</li>
          <li>{el.status}</li>

        </ul>
      </li>
    ))}
  </ul>
);

const mapStateToProps = state => {
  return { articles: state.articles };
};

const List = connect(mapStateToProps)(ConnectedList);
export default List;
