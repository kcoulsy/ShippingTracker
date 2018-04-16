import axios from 'axios';

import {
  ADD_ARTICLE,
  EDIT_ARTICLE,
  REMOVE_ARTICLE,
  SET_USER
} from '../constants/action-types';

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
  console.log('data', data);
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
        dispatch(addArticle(data));
      }
    });
  }
}
export const editArticle = (article) => ({
  type: EDIT_ARTICLE,
  payload: article
})

export const removeArticle = ({ id } = {}) => ({
  type: REMOVE_ARTICLE,
  id
})

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
})
