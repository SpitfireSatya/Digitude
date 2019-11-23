var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var Promise = require('bluebird');

var User = require('../models/User_model.js');
var Contact = require('../models/contact_model.js');
var Digitude_event = require('../models/digitude_event_model.js');
var Like = require('../models/like_model.js');
var Comment = require('../models/comment_model.js');

var find_event = require('../common/find_event.js');
var find_like = require('../common/find_like.js');
var new_like = require('../common/new_like.js');
var update_like = require('../common/update_like.js');

var digitude_event;

module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		return find_like(req, res)	
		.then(function(like){
			if(like == null)
			{
				return new_like(req, res)
			}
			else
			{
				return update_like(req, res, like)
			}
		})

		.then(function(){
			resolve(req.body.eventID);
		})
	});
}

		/*
		Digitude_event.findById(req.body.eventID, function(err, digitude_event){
			if(err)
			{
				console.log(err.stack);
			}
			if(digitude_event)
			{
				var query = Like.findOne({});
				query.and([{like_creator : req.user._id}, {liked_event : req.body.eventID}]).exec(function(err, like){
					if(err)
					{
						console.log(err.stack);
					}
					if(like)
					{
						like.value = !(like.value);
		
						if(like.value.toString() == "true")
						{
							digitude_event.like_count++; 
						}
						if(like.value.toString() == "false")
						{
							digitude_event.like_count--;
						}
						like.save(function(err){
							if(err)
							{
								console.log(err.stack);
							}
						});

						digitude_event.save(function(err){
							if(err)
							{
								console.log(err)
							}
						});
					}
					else
					{
						var likenew = new Like({
							value : true,
							like_creator : req.user._id,
							liked_event : req.body.eventID
						});
						likenew.save(function(err){
							if(err)
							{
								console.log(err.stack);
							}
						});
						digitude_event.like_count++;
						digitude_event.save(function(err){
							if(err)
							{
								console.log(err)
							}
						});
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