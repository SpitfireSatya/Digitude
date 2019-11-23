var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var event_list = require('../controller/event_list.js');
var event_details = require('../controller/event_details.js');
var Promise = require('bluebird');

var User = require('../models/User_model.js');
var Contact = require('../models/contact_model.js');
var Digitude_event = require('../models/digitude_event_model.js');
var Like = require('../models/like_model.js');
var Comment = require('../models/comment_model.js');

var data = [];

//-------------------get all comments and likes for event------------------

router.all('/show?', function(req, res){
	event_details(req, res)
	.then(function(resolve){
		res.send(resolve);
	});
});


//------------------------------All Events---------------------------------------

router.all('/list', function(req, res){
	event_list(req,res)
	.then(function(resolve){
		res.send(resolve);
	});
});


module.exports = router;