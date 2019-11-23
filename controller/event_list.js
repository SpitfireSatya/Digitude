var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var Promise = require('bluebird');

var User = require('../models/User_model.js');
var Contact = require('../models/contact_model.js');
var Digitude_event = require('../models/digitude_event_model.js');
var Like = require('../models/like_model.js');
var Comment = require('../models/comment_model.js');

var find_all_events = require('../common/find_all_events.js');

module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		var data = [];
		return find_all_events(req, res)
		.then(function(data){
			resolve(data);
		});
	});
}

		/*
		Digitude_event.find({}, function(err, digitude_events){
			if(err)
			{
				console.log(err.stack);
			}
			if(digitude_events)
			{
				digitude_events.forEach(function(digitude_event){
					data.push(digitude_event);
				});
			}
			if (err) 
			{
				reject(err);
			} 
			else 
			{
				resolve(data)
			}	
		});
*/