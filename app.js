// app.js

//=================================================
// GLOBAL
//=================================================
var express        = require('express');
var path           = require('path');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var methodOverride = require('method-override');
var session        = require('express-session');
var flash          = require('connect-flash');
var PrettyError    = require('pretty-error');
var bcrypt         = require('bcrypt-nodejs');


//=================================================
// ROUTES
//=================================================
var indexRouter  = require('./routes/index');
var userRouter   = require('./routes/user');
var recipeRouter = require('./routes/recipe');

//=================================================
// CONNECT TO DATABASE IF ON HEROKU
//=================================================
var app = express();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/recipes');

//=================================================
// VIEW ENGINE SETUP
//=================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//=================================================
//APP.USE SECTION
//=================================================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));


//=================================================
//PASSPORT
//=================================================

app.use(session({secret: "SECRET",
                 resave: true,
                 saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport/passport')(passport);


//=================================================
//ESTABLISH GLOBAL USER
//=================================================

app.use(function(req, res, next) {
  global.currentUser = req.user;
  next();
});

//=================================================
//PRETTY ERROR
//=================================================
var pe = new PrettyError();
pe.start();

//=================================================
//ROUTES
//=================================================
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/api/recipes', recipeRouter);

//=================================================
//CATCH 404, FORWARD TO ERROR HANDLER
//=================================================
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//=================================================
//ERROR HANDLERS
//=================================================

//Development event handler
//Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.redirect('/');
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
