require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var {authenticate} = require('./middleware/authenticate');

const {
  postShipments,
  getShipments,
  getShipmentById,
  deleteShipment,
  updateShipment
} = require('./controllers/shipments.controller.js');

const {
  createUser,
  loginUser,
  logoutUser,
  getUser
} = require('./controllers/users.controller.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use((req, res, next) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH ');
 res.setHeader('Access-Control-Allow-Headers',
   'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-auth');
  res.setHeader('Access-Control-Expose-Headers', 'x-auth');
   //and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});


//ShipmentsAPI
app.post('/shipment', authenticate, postShipments);
app.get('/shipments', authenticate, getShipments);
app.get('/shipments/:id', authenticate, getShipmentById);
app.delete('/shipments/:id', authenticate, deleteShipment);
app.patch('/shipments/:id', authenticate, updateShipment);

//User API
app.post('/Users', createUser);
app.post('/users/login', loginUser);
app.get ('/users/me', authenticate, getUser);
app.delete('/users/me/token', authenticate, logoutUser);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})


module.exports = {app};
