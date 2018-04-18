import axios from 'axios';
import store from '../store/store';

import {
  ADD_ARTICLE,
  EDIT_ARTICLE,
  REMOVE_ARTICLE,
  SET_USER
} from '../constants/action-types';

export const startGetShipments = () => {
  //Clear the store
  //Get Shipments
  //Run ADD_ARTICLE for each of them to add to the store

    const token = store.getState().user.token;
    const url = 'http://localhost:3000/shipments';
    const data = {};
    return axios({
      method: 'get',
      url,
      data,
      headers: {
        'x-auth': token
      }
    }).then((response)=>{

        console.log(response);
        if(response.status === 200){
          console.log('getTime 200');
          const articles = store.getState().articles;
          console.log('got shipments ', articles);
          articles.forEach((article)=>{
            store.dispatch(removeArticle({id: article._id}));
            console.log('remove id ' + article._id)
          });

          response.data.shipments.forEach((shipment)=>{
            store.dispatch(addArticle(shipment));
          })
        }
      });
}
export const addArticle = article => ({
  type: ADD_ARTICLE,
  payload: article
})

export const startAddShipment = (shipment = {}) =>{
  return (dispatch, getState) => {
  console.log('start add shipment');
  const token = getState().user.token;
  const url = 'http://localhost:3000/shipment';
  const {
    date = 0,
    name = '',
    contents = [],
    shippingCost = 0,
    tracking = '',
    status = ''
  } = shipment;

  const _creator = 123;
  const data = {date, name, contents, shippingCost, tracking, status, _creator};

  const config = {

  };
  return axios({
    method: 'post',
    url,
    data,
    headers: {
      'x-auth': token
    }
  }).then((response)=>{

      console.log(response);
      if(response.status === 200){
        console.log('post 200');
        dispatch(addArticle(response.data));
      }
    });
  }
}

export const editArticle = (id, updates) => ({
  type: EDIT_ARTICLE,
  id,
  updates
});

export const startEditShipment = (shipment) =>{
  return (dispatch, getState) => {
  const url = 'http://localhost:3000/shipments/' + shipment._id;
  const token = getState().user.token;
  const {
    date = 0,
    name = '',
    contents = [],
    shippingCost = 0,
    tracking = '',
    status = ''
  } = shipment;
  const data = {date, name, contents, shippingCost, tracking, status};
  console.log('data', data);
  return axios({
    method: 'patch',
    url,
    data,
    headers: {
      'x-auth': token
    }
  }).then((response)=>{

      console.log(response);
      if(response.status === 200){
        console.log('edit article');
        console.log(response);
        dispatch(editArticle(response.data.shipment._id, response.data.shipment));
      }
    });
  }
}

export const removeArticle = ({ id } = {}) => ({
  type: REMOVE_ARTICLE,
  id
})
export const startRemoveShipment = ({ id } = {}) => {
  const url = 'http://localhost:3000/shipments/' + id;
  const token = store.getState().user.token;
  const data = {};
  return axios({
    method: 'delete',
    url,
    data,
    headers: {
      'x-auth': token
    }
  }).then((response)=>{

      console.log(response);
      if(response.status === 200){
        console.log('delete article');
        console.log(id);
        store.dispatch(removeArticle({id}));
      }
    });
}
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
})
