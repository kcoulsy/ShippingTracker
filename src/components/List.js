import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment';

const ConnectedList = ({ articles }) => (
  <ul className="list-group list-group-flush">
    {articles.map(el => (

      <Link to={`/edit/${el.id}`} key={el.id}>
      <li >
        <ul>
          <li>{moment(el.date).format('Do MMMM YYYY')}</li>
          <li>Name: {el.name}</li>
          <li>Contents: {el.contents.map((content)=>(
              <ul key={content.index}>
                <li>{content.name}</li>
                <li>{content.variation}</li>
                <li>{content.qty}</li>
              </ul>
            ))}</li>
          <li>DHL Cost: {el.shippingCost}</li>
          <li>Tracking: {el.tracking}</li>
          <li>Status: {el.status}</li>

        </ul>
      </li>
      </Link>
    ))}
  </ul>
);

const mapStateToProps = state => {
  return { articles: state.articles };
};

const List = connect(mapStateToProps)(ConnectedList);
export default List;
