var express = require('express');
var app = express();
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Q = require('q');

var Digitude_event = require('./models/digitude_event_model.js');
var Like = require('./models/like_model.js');
var Comment = require('./models/comment_model.js');

var url = "mongodb://localhost:27017/new";
var db = mongoose.connect(url, function(){
data  = [];

function func1(){
	var deferred = Q.defer();
	data1  = [];
	Digitude_event.findById('56c3fe6d4ce378809911f1bb', function(err, digitude_event){
		if(err)
		{
			deferred.reject(new Error(err));
		}
		if(digitude_event)
		{
			data1.push(digitude_event);
		}
		deferred.resolve(data1);
		console.log('event');
	});
	return deferred.promise;
}

function func2(){
	var deferred = Q.defer();
	var data2 = [];
	var query = Like.find({});
	query.and([{liked_event : '56c3fe6d4ce378809911f1bb'}, {value : "true"}]).exec(function(err, likes){
		if(err)
		{
			deferred.reject(new Error(err));
		}
		if(likes)
		{
			likes.forEach(function(like){
				data2.push(like);
			});	
		}
		console.log('like');
		deferred.resolve (data2);
	});
	return deferred.promise;
}

function func3(){
	var deferred = Q.defer();
	var data3 = [];
	Comment.find({comment_event : '56c3fe6d4ce378809911f1bb'}, function(err, comments){
		if(err)
		{
			deferred.reject(new Error(err));
		}
		if(comments)
		{
			comments.forEach(function(comment){
				data3.push(comment);
			});	
		}
		console.log('comment');
		deferred.resolve (data3)
	});
	return deferred.promise;
}


app.all('/', function(req, res){

	func1()
	.then(function(data1){
		data.push(data1)
		return func2()
	})

	.then(function(data2){
		data.push(data2)
		return func3()
	})

	.then(function(data3){
		data.push(data3);
	})

	.then(function(){
		res.send(data);
	})
	
	.catch(function(reject){
		console.log(reject);
	})
});

app.listen(3000, function(){
	console.log('listening at port 3000');
});

});