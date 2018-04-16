import axios from 'axios';

import store from '../store/store';

import {setUser} from '../actions/index';

export const register = (email, password)=>{
  console.log('register');
  const url = 'http://localhost:3000/users'
  const data = {
    email,
    password
  }
  axios.post(url,data).then((response)=>{
    if(response.status === 200){
      store.dispatch(setUser({
        email,
        token: response.headers['x-auth']
      }))
    }
    console.log('done');
  })
}

export const login = (email, password)=>{
  console.log('login');
  const url = 'http://localhost:3000/users/login'
  const data = {
    email,
    password
  }
  axios.post(url,data).then((response)=>{
    if(response.status === 200){

      store.dispatch(setUser({
        email,
        token: response.headers['x-auth']
      }))
      sessionStorage.setItem('email', email)
      sessionStorage.setItem('token', response.headers['x-auth']);
    }
    console.log('done');
  })
}
export const getSession = () => {
  const email = sessionStorage.getItem('email');
  const token = sessionStorage.getItem('token');

  const url = 'http://localhost:3000/users/me';
  const data = {};
  const config = {

  };
  axios({
    method: 'get',
    url,
    data,
    headers: {
      'x-auth': token
    }
  }).then((response)=>{
      console.log(response);
      if(response.data.email === email){
        store.dispatch(setUser({
          email,
          token
        }))
      }
    });

}

export const logout = ()=>{
  const url = 'http://localhost:3000/users/me/token';
  const data = {};
  const token = store.getState().user.token;
  const config = {

  };
  axios({
    method: 'delete',
    url,
    data,
    headers: {
      'x-auth': token
    }
  }).then((response)=>{
      console.log(response);
      if(response.status === 200){
        store.dispatch(setUser({}));
        console.log('logged out')

      }
      console.log('done');
    });

}
