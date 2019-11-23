var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var Promise = require('bluebird');

var User = require('../models/User_model.js');
var Contact = require('../models/contact_model.js');
var Digitude_event = require('../models/digitude_event_model.js');
var Like = require('../models/like_model.js');
var Comment = require('../models/comment_model.js');

var find_event_query = require('../common/find_event_query.js');
var find_all_likes = require('../common/find_all_likes.js');
var find_all_comments = require('../common/find_all_comments.js');


module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		data  = [];
		return find_event_query(req, res)
		.then(function(digitude_event){
			data.push(digitude_event);
			return find_all_likes(req, res);
		})

		.then(function(likes){
			data.push(likes);
			return find_all_comments(req, res);
		})

		.then(function(comments){
			data.push(comments);
		})

		.then(function(){
			resolve(data);
		});

	});
}



		/*
		Digitude_event.findById(req.query.eventID, function(err,digitude_event){
			if(err)
			{
				console.log(err);
			}
			if(digitude_event)
			{
				data.push(digitude_event);
			}

			var query = Like.find({});
			query.and([{liked_event : req.query.eventID}, {value : "true"}]).exec(function(err,likes){
				if(err)
				{
					console.log(err);
				}
				if(likes)
				{
					likes.forEach(function(like){
						data.push(like);
					});
				}
			

				Comment.find({comment_event : req.query.eventID}, function(err,comments){
					if(err)
					{
						console.log(err);
					}
					if(comments)
					{
						comments.forEach(function(comment){
							data.push(comment);
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
			});
		});
*/