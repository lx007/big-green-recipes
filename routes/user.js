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

//=================================================
//AUTHENTICATION
//=================================================
function authenticate(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
}

function authorized (req, res, next) {
  if (currentUser) {
    next();
  } else {
    res.redirect('/');
  }
}


// =================================
// GET USERS
// =================================
router.get('/', function(req, res, next) {
  res.render('user/index.ejs', { currentUser: currentUser });
});

// =================================
// USER SHOW - GET
// USER SHOW - PUT
// =================================
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

//---------------------------------------
//  User Edit - GET
//---------------------------------------
router.route('/id/edit')
  .get(authenticate, function(req, res, next) {
    if(authorized(req.params.id)) {
      res.render('user/edituser.ejs', { currentUser: currentUser });
    }else {
      res.redirect('/users/'+ currentUser._id);
    }
  });

module.exports = router;

// INDEX
// router.get('/index', authenticate, function(req, res, next) {
//     var myUser = global.currentUser.user;
//     res.render('users/index', { users: myUser, message: req.flash() });
// });

// // SHOW
// router.get('/:id', authenticate, function(req, res, next) {
//     User.find({ user: global.currentUser })
//         .then(function(users) {
//              Prompt.find({})
//                 .then(function(recipes) {
//                     console.log("USERS-prompt", recipes[0].title );

//                     res.render('users/show', { users: users, prompts: prompts, message: req.flash() });
//                 });  /// closes off the prompt
//         });  /// closes off the user
// });  /// closes off the router get

// // http://localhost:3000/users/show/

// // EDIT
// router.get('/edit/:id', authenticate, function(req, res, next) {

//     User.find({ user: global.currentUser })
//         .then(function(users) {
//             res.render('users/edit', { users: users, message: req.flash() });
//         });
// });

// // UPDATE
// router.put('/:id', authenticate, function(req, res, next) {
//     var user = currentUser.users.id(req.params.id);
//     if (!user) return next(makeError(res, 'Document not found', 404));
//     else {
//         user.userTheme = req.body.userTheme;
//         currentUser.save()
//             .then(function(saved) {
//                 res.redirect('/users');
//             }, function(err) {
//                 return next(err);
//             });
//     }
// });


// // DESTROY
// router.delete('/:id', authenticate, function(req, res, next) {
//     var user = currentUser.users.id(req.params.id);
//     if (!user) return next(makeError(res, 'Document not found', 404));
//     var index = currentUser.users.indexOf(user);
//     currentUser.users.splice(index, 1);
//     currentUser.save()
//         .then(function(saved) {
//             res.redirect('/users');
//         }, function(err) {
//             return next(err);
//         });
// });

// module.exports = router;

