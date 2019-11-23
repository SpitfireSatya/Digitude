var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var path = require('path');

var Digitude_event = require('../models/digitude_event_model.js');

module.exports = function(req, res){
	return new Promise(function(resolve, reject){
		Digitude_event.findById(req.query.eventID, function(err, digitude_event){
			if(err)
			{
				reject(err);
			}
			else
			{
				resolve(digitude_event);
			}
		});
	});
}