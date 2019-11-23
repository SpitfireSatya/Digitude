var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var Comment = require('../models/comment_model.js');

module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		Comment.findOne({_id : req.body.commentID}, function(err, comment){
			if(err)
			{
				reject(err)
			}
			if(comment)
			{
				resolve(comment);
			}
		});
	});
}