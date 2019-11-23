var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var Promise = require('bluebird');

//------------------------ controllers -----------------------------
var save_comment = require('../controller/save_comment.js');
var update_comment = require('../controller/update_comment.js');
var delete_comment = require('../controller/delete_comment.js');


//------------------------ Models ----------------------------------
var User = require('../models/User_model.js');
var Contact = require('../models/contact_model.js');
var Digitude_event = require('../models/digitude_event_model.js');
var Like = require('../models/like_model.js');
var Comment = require('../models/comment_model.js');

var data = [];

//------------------------- Authentication -------------------------
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
};

//-----------------------------New Comment-----------------------------
router.post('/comment', isAuthenticated,  function(req, res){
	save_comment(req,res).then(function(resolve){
		res.redirect('/events/show?eventID='+resolve);
	});
});

//------------------------------update Comment------------------------------
router.put('/comment', isAuthenticated, function(req, res){
	update_comment(req,res).then(function(resolve){
		res.redirect('/events/show?eventID='+resolve);
	});
});


//-----------------------------Delete Comment-------------------------------------
router.delete('/comment', isAuthenticated, function(req, res){
	delete_comment(req,res).then(function(resolve){
		res.redirect('/events/show?eventID='+resolve);
	});
});

module.exports = router;