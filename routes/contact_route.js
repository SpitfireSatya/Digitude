var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var contact_us = require('../controller/contact_us.js');
var Promise = require('bluebird');

var Contact = require('../models/contact_model.js');

router.post('/', function(req, res){
	contact_us(req,res).then(function(resolve){
		res.send('Saved');
	});
});

module.exports = router;