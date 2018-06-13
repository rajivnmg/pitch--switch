var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product.js');
var passport = require('passport');
require('../config/passport')(passport);


getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


/* GET ALL PRODUCTS */
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Product.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
/* SAVE PRODUCTS */
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Product.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});


/* ADD PRODUCT */
router.post('/products/add/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Product.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});


/* SHOW PRODUCT */
router.get('/products/show/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  
  if (token) {
    Product.find({},function (err, product) {
      if (err) return next(err);
      res.json(product);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Product does not exist.'});
  }
});


/* DETELE PRODUCT */
router.get('/products/delete/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Product.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
 
module.exports = router;



