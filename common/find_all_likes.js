var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var User = require('../models/User_model.js');
var Like = require('../models/like_model.js');

module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		var query = Like.find({});
		query.and([{liked_event : req.query.eventID}, {value : "true"}]).exec(function(err, likes){
			if(err)
			{
				reject(err)
			}
			else
			{
				resolve(likes);
			}
		});
	});
}
