var express = require("express");
var app = express();
var bodyParser = require("body-parser");


// Set views directory (./views by default)
app.set("views", "./views");
// Set Jade as the default view engine.
app.set('view engine', 'jade')

// Middleware - must be defined before routes.
app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', function(req, res) {
  res.render('index', { title: "Home" });
});

// Pass in routes from admin.js
var adminRouter = require('./admin');
app.use('/admin', adminRouter);

// Listen
app.listen(3000, function() {
  console.log('Chat app listening on port 3000!');
});
