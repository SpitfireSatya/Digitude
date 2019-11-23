var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var User = require('../models/User_model.js');
var Like = require('../models/like_model.js');

module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		var query = Like.findOne({});
		query.and([{like_creator : req.user._id}, {liked_event : req.body.eventID}]).exec(function(err, like){
			if(err)
			{
				reject(err)
			}
			if(like)
			{
				resolve(like);
			}
			else
			{
				resolve(null);
			}
		});
	});
}