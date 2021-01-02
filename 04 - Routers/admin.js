var uuid = require("node-uuid");
var _ = require("lodash");
var express = require('express');
var rooms = require("./data/rooms.json");

// Set up router object to which all routes will be attached
var router = express.Router();
module.exports = router;

// Admin routes
router.get('/rooms', function(req, res) {
  res.render("rooms", {
    title: "Admin Rooms",
    rooms: rooms
  });
});

router.route('/rooms/add')
  .get(function(req, res) {
    res.render("add");
  })
  .post(function(req, res) {
    var room = {
      name: req.body.name,
      id: uuid.v4()
    };
    rooms.push(room);
    res.redirect("./");
  });

router.route('/rooms/edit/:id')
  .get(function(req, res) {
    var roomId = req.params.id;
    var room = _.find(rooms, r => r.id === roomId);
    if(!room) {
      res.sendStatus(404);
      return;
    }
    res.render("edit", { room });
  })
  .post(function(req, res) {
    var roomId = req.params.id;
    var room = _.find(rooms, r => r.id === roomId);
    room.name = req.body.name;
    res.redirect(req.baseUrl + "/rooms");
  });

router.get('/rooms/delete/:id', function(req, res) {
  var roomId = req.params.id;
  rooms = rooms.filter(r => r.id !== roomId);
  res.redirect(req.baseUrl + "/rooms");
});
