var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
require('./passport-init');

// Set views directory (./views by default)
app.set("views", "./views");
// Set Jade as the default view engine.
app.set('view engine', 'jade')

// HTTP logging to file
app.use(require("./logging.js"))

// Middleware - must be defined before routes.
app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static('node_modules/jquery/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Debugging
require('express-debug')(app, {});

// Authentication middleware
app.use(require('express-session')({
  secret: 'keyboard cat', resave: false, saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Add in authorization middleware
var authRouter = require('./auth');
app.use(authRouter);

// Require users to login before accessing application
app.use(function(req, res, next) {
  if(req.isAuthenticated()) {
    res.locals.user = req.user;
    next();
    return;
  }
  res.redirect("/login");
});

// Routes
app.get('/', function(req, res, next) {
  res.render('home', { title: "Home" });
});

// Pass in routes from admin.js
var adminRouter = require('./admin');
app.use('/admin', adminRouter);


// Pass in routes from api.js
var apiRouter = require('./api');
app.use('/api', apiRouter);

// Listen
app.listen(3000, function() {
  console.log('Chat app listening on port 3000!');
});
