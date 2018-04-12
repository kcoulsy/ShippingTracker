const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {Shipment} = require('../models/shipments');

//Add a shipment to the database
const postShipments = (req,res) => {
  var shipment = new Shipment({
    name: req.body.name,
    _creator: req.user._id
  });

  shipment.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
}

const getShipments = (req, res) => {
  Shipment.find({
    _creator: req.user._id
  }).then((shipments)=>{
    res.send({shipments});
  }, (e) => {
    res.status(400).send(e);
  });
}

const getShipmentById = (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.sendStatus(404);
  } else {
    Shipment.findOne({
      _id: id,
      _creator: req.user._id
    }).then((shipment)=>{
      if(!shipment){
        res.sendStatus(404);
      }
      res.send({shipment});
    }).catch((e) => {
      res.status(400).send();
    });
  }
}

const deleteShipment = (req, res) => {
  // get the id
  var id = req.params.id;

  //validate the id or return 404
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Shipment.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((shipment) => {
    if(!shipment) {
      return res.status(404).send();
    }
    return res.send({shipment: shipment});
  }).catch((e) => {
    return res.status(400).send();
  })
  //remove todobyid
    //success
      //if no doc -> 404
      //if doc then send back with 200
    //error
      //400 with empty body
}
const updateShipment = (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['name','complete']);///update this

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.complete) && body.complete){
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
    body.complete = false
  }

  Shipment.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((shipment) => {
    if(!shipment){
      return res.status(404).send();
    }
    res.send({shipment});
  }).catch((e) => {
    res.status(400).send();
  });
}


module.exports = {
  postShipments,
  getShipments,
  getShipmentById,
  deleteShipment,
  updateShipment
}
