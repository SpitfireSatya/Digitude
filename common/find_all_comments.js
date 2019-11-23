var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var Comment = require('../models/comment_model.js');

module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		Comment.find({comment_event : req.query.eventID}, function(err,comments){
			if(err)
			{
				reject(err)
			}
			else
			{
				resolve(comments);
			}

		});
	});
}