var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var path = require('path');

var find_event = require('./find_event.js');

var User = require('../models/User_model.js');
var Like = require('../models/like_model.js');

module.exports = function(req, res, like){
	return new Promise(function(resolve, reject){
		return find_event(req, res)
		.then(function(digitude_event){
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
					reject(err);
				}
			});

			digitude_event.save(function(err){
				if(err)
				{
					reject(err);
				}
			});
		})
		.then(function(){
			resolve(like);
		})
	});
}