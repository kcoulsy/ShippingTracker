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
    }
    console.log('done');
  })

}

export const logout = ()=>{
  console.log('login');
  const url = 'http://localhost:3000/users/me/token';
  const data = {};
  const token = store.getState().user.token;
  console.log(token);
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
