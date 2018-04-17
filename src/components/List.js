import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment';

const ConnectedList = ({ articles }) => (
    <table className="table table-striped">
    <thead>
      <tr>
        <th>Date</th>
        <th>Name</th>
        <th>Contents</th>
        <th>DHL Cost</th>
        <th>Tracking</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
    {articles.map(el => (


        <tr>
          <td>{moment(el.date).format('Do MMMM YYYY')}</td>
          <td><Link to={`/edit/${el.id}`} key={el.id}>{el.name}</Link></td>
          <td>{el.contents ? el.contents.map((content)=>(
              <ul>
                <li>name</li>
                <li>variation</li>
                <li>qty</li>
              </ul>
            )) : ''}</td>
          <td>{el.shippingCost}</td>
          <td>{el.tracking}</td>
          <td>{el.status}</td>
          </tr>


    ))}
    </tbody>
    </table>

);

const mapStateToProps = state => {
  return { articles: state.articles };
};

const List = connect(mapStateToProps)(ConnectedList);
export default List;
