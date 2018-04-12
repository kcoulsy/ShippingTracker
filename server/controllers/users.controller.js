const mongoose = require('mongoose');
const _ = require('lodash');

var {User} = require('../models/user');

const createUser = (req,res) => {
  var body = _.pick(req.body, ['email','password']);
  var user = new User(body);

  user.save().then(() => {
    //instead of res.send(user) we return the
    return user.generateAuthToken();
    //call the generateAuthToken method which puts a token into the database, then returns it
    //so we can use a .then() using the token variable
  }).then((token) => {

    //res.send(user);

    //using the token returned above, we can put it in the header so it can be used later.
    res.header('x-auth', token).send(user);

    //then catch any errors which may occur, such as incorrect data (invalid email/pass etc)
  }).catch((e) => {
    res.status(400).send(e);
  })
};

const loginUser = (req,res) => {
  var body = _.pick(req.body, ['email','password']);

  //verify user exists with email and password
  User.findByCredentials(body.email, body.password).then((user) =>{
    //exactly same as above
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e)=>{
    res.status(400).send();
  });
  //then compare hashed password
  //res.send(body);
}

const logoutUser = (req, res) => {
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  }, () =>{
    res.status(400).send();
  });
}
const getUser = (req, res)=>{
  res.send(req.user);
}
module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getUser
}
