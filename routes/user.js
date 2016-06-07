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
// USER SHOW - GET
// USER SHOW - PUT
// ================================= //
router.route('/:id')
  .get(function(req, res, next) {
    console.log(currentUser);
    User.findById(req.params.id)
    .exec(function(err, user) {
        console.log(newUser);
        res.json(newUser);
      })
    });

  // .put(authenticate, function(req, res, next) {
  //   if(authorized(req.params.id)) {

  //   }
  // });

//---------------------------------------//
//  User Edit - GET                      //
//---------------------------------------//
router.route('/id/edit')
  .get(authenticate, function(req, res, next) {
    if(authorized(req.params.id)) {
      res.render('user/edituser.ejs', { currentUser: currentUser });
    }else {
      res.redirect('/users/'+ currentUser._id);
    }
  });

module.exports = router;

