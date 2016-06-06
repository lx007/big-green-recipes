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
    User.populate(currentUser, { path: 'collections', model: 'Collection' }, function(err, user) {
        res.json(user);
    });
})


// GET Signup
router.get('/signup', function(req, res, next) {
    res.render('signup.html', { loggedIn: currentUser, message: req.flash() });
});


// POST Signup
router.post('/signup', function(req, res, next) {
    var signUpStrategy = passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    });
    return signUpStrategy(req, res, next);
});

// GET /login
router.get('/login', function(req, res, next) {
    res.render('login.html', { loggedIn: currentUser, message: req.flash() });
});


// POST /login
router.post('/login', function(req, res, next) {
    var loginProperty = passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    });
    return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
