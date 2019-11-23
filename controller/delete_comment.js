var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var Promise = require('bluebird');

var User = require('../models/User_model.js');
var Contact = require('../models/contact_model.js');
var Digitude_event = require('../models/digitude_event_model.js');
var Like = require('../models/like_model.js');
var Comment = require('../models/comment_model.js');

var find_comment = require('../common/find_comment.js');
var find_event = require('../common/find_event.js');

module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		var flag = 0;
		return find_comment(req, res)
		.then(function(comment){
			if(req.user._id.equals(comment.comment_creator.toString()))
			{
				flag = 1;
				Comment.remove({_id : req.body.commentID}, function(err){
					if(err)
					{
						reject(err);
					}
				});
			}
			return find_event(req, res)
		})
		.then(function(digitude_event){
			if(flag==1)
			{
				digitude_event.comment_count--;
				digitude_event.save(function(err){
					if(err)
					{
						reject(err);
					}
				});
			}
		})
		.then(function(){
			resolve(req.body.eventID);
		});
	});
}


		/*
		Comment.findOne({_id : req.body.commentID}, function(err, comment){
			if(err)
			{
				console.log(err.stack);
			}
			if(comment)
			{
				Digitude_event.findById(comment.comment_event, function(err, digitude_event){
				if(err)
				{
					console.log(err.stack);
				}
				if(digitude_event)
				{
					if(req.user._id.equals(comment.comment_creator.toString()))
					{
						Comment.remove({_id : req.body.commentID}, function(err){
							if(err)
							{
								console.log(err);
							}
				
							digitude_event.comment_count--;
							digitude_event.save(function(err){
								if(err)
								{
									console.log(err)
								}
							});
						});
					}
					
				}
				});
			}
			if (err) 
			{
				reject(err);
			} 
			else 
			{
				resolve(req.body.eventID)
			}
		});
*/