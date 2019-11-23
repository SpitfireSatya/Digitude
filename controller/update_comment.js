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

module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		return find_comment(req, res)
		.then(function(comment){
			if(req.user._id.equals(comment.comment_creator.toString()))
			{
				comment.value = req.body.value;
				comment.save(function(err){
					if(err)
					{
						console.log(err.stack);
					}
					//res.redirect('/events/show?eventID='+req.body.eventID);
				});
			}
		})
		.then(function(){
			resolve(req.body.eventID)
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
				if(req.user._id.equals(comment.comment_creator.toString()))
				{
					comment.value = req.body.value;
					comment.save(function(err){
						if(err)
						{
							console.log(err.stack);
						}
						//res.redirect('/events/show?eventID='+req.body.eventID);
					});
				}
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