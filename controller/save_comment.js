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


module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		return find_event(req, res)
		.then(function(digitude_event){
			var commentnew = new Comment({
				value : req.body.value,
				date : new Date(),
				comment_creator : req.user._id,
				comment_event : req.body.eventID
			});

			commentnew.save(function(err){
				if(err)
				{
					reject(err)
				}
			});

			digitude_event.comment_count++;
			digitude_event.save(function(err){
				if(err)
				{
					reject(err)
				}
			});
		})
		.then(function(){
			resolve(req.body.eventID)
		});
	});
}



		/*Digitude_event.findById(req.body.eventID, function(err, digitude_event){
			if(err)
			{
				console.log(err.stack);
			}
			if(digitude_event)
			{
				var commentnew = new Comment({
					value : req.body.value,
					date : new Date(),
					comment_creator : req.user._id,
					comment_event : req.body.eventID
				});
				commentnew.save(function(err){
					if(err)
					{
						console.log(err)
					}
				});
				digitude_event.comment_count++;
				digitude_event.save(function(err){
					if(err)
					{
						console.log(err)
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