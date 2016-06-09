var express = require('express');
var router = express.Router();
var passport = require('passport');
var Recipe = require('../models/recipe');

// GET Home Page
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Recipes', message: req.flash() });
});

// GET Current User
router.get('/currentUser', function(req, res, next) {
    console.log('current user: ' + currentUser);
    res.json(currentUser);
});

// GET Signup
router.get('/signup', function(req, res, next) {
    res.render('signup.html', { loggedIn: currentUser, message: req.flash() });
});


// POST Signup
router.route('/signup')
.post(passport.authenticate('local-signup'), function(req, res) {
    res.json(req.user);
});

// GET /login
router.get('/login', function(req, res, next) {
    res.render('login.html', { loggedIn: currentUser, message: req.flash() });
});


// POST /login
router.route('/login')
.post(passport.authenticate('local-login'), function(req, res) {
    console.log(req.body + 'line 38');
    res.json(req.body);
});

// // NEW POST ROUTE
// // GET /login
// router.route('/login')
//  .post(function(req, res, next) {
//     res.json({test: 'Worked'});
//     console.log(req.body)
// });


// GET /logout
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
