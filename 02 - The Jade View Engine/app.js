var express = require("express");
var app = express();

// Set views directory (./views by default)
app.set("views", "./views");
// Set Jade as the default view engine.
app.set('view enginer', 'jade')

// Middleware
app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));

// Routes
app.get('/', function(req, res) {
  res.render('index', { title: "Home" });
});

app.get('/admin/rooms', function(req, res) {
  res.render("rooms", { title: "Admin Rooms" });
});

// Listen
app.listen(3000, function() {
  console.log('Chat app listening on port 3000!');
});
