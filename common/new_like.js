var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var path = require('path');

var find_event = require('./find_event.js');

var User = require('../models/User_model.js');
var Like = require('../models/like_model.js');

module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		var likenew = new Like({
			value : true,
			like_creator : req.user._id,
			liked_event : req.body.eventID
		});

		likenew.save(function(err){
			if(err)
			{
				reject(err);
			}
		});
		
		return find_event(req, res)
		.then(function(digitude_event){
			digitude_event.like_count++;
			digitude_event.save(function(err){
				if(err)
				{
					reject(err);
				}
			})
		})
		.then(function(){
			resolve(likenew);
		})
	});
}