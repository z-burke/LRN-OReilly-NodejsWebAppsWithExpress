var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Set views directory (./views by default)
app.set("views", "./views");
// Set Jade as the default view engine.
app.set('view engine', 'jade')

// HTTP logging to file
var fs = require("fs");
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

app.use(require("morgan")("combined", {stream: accessLogStream}));

// Middleware - must be defined before routes.
app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static('node_modules/jquery/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Debugging
require('express-debug')(app, {});

// Routes
app.get('/', function(req, res, next) {
  fs.readFile('./data/roomss.json', 'utf8', function(error, data) {
    if(error) { next(error); return; } res.send(data);
  });
});

// Pass in routes from admin.js
var adminRouter = require('./admin');
app.use('/admin', adminRouter);

// Pass in routes from a[o/ks
var apiRouter = require('./api');
app.use('/api', apiRouter);

// Listen
app.listen(3000, function() {
  console.log('Chat app listening on port 3000!');
});
