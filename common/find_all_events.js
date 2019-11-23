var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var Digitude_event = require('../models/digitude_event_model.js');

module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		var data = [];
		Digitude_event.find({}, function(err, digitude_events){
			if(err)
			{
				reject(err);
			}
			else
			{
				resolve(digitude_events);
			}
		});
	});
}