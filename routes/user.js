var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Recipe = require('../models/recipe');




function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// Check if authorized
function authorized(id) {
  return ""+currentUser._id === id;
}

// Checkt if authenticated
function authenticate (req, res, next) {
  req.isAuthenicated? next () : res.redirect('/');
}



// ================================= //
// GET USERS
// ================================= //
router.get('/', function(req, res, next) {
  res.render('user/index.ejs', { currentUser: currentUser });
});

// ================================= //
// EDIT USER
// ================================= //
router.get('/user')




module.exports = router;


