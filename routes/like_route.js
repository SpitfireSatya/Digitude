var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cluster = require('cluster');
var Promise = require('bluebird');

var like_unlike = require('../controller/like_unlike.js');

var User = require('../models/User_model.js');
var Contact = require('../models/contact_model.js');
var Digitude_event = require('../models/digitude_event_model.js');
var Like = require('../models/like_model.js');
var Comment = require('../models/comment_model.js');

var data = [];

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
};

//------------------------------Update Likes-------------------------------------

router.post('/like',isAuthenticated,  function(req, res){
	like_unlike(req, res).then(function(resolve){
		res.redirect('/events/show?eventID='+resolve);
	});
});

module.exports = router;