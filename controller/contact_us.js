var mongoose = require('mongoose');
var Promise = require('bluebird');
var bodyParser = require('body-parser');
var Contact = require('../models/contact_model.js');

module.exports = function(req, res){
	return new Promise(function(resolve, reject){
			var contactnew = new Contact({
			name : req.body.name,
			email : req.body.email,
			subject : req.body.subject,
			description : req.body.description
		});

		contactnew.save(function(err){
			if (err) 
			{
				reject(err);
			} 
			else 
			{
				resolve(contactnew);
			}
		});
	});
}