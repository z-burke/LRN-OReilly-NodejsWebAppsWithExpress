var express = require("express");
var app = express();

// Middleware
app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));

// Routes
app.get('/hello', function(req, res) {
  res.send('Hello World!');
});

// Listen
app.listen(3000, function() {
  console.log('Chat app listening on port 3000!');
});
