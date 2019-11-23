var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likeSchema = new mongoose.Schema({
	value : Boolean,
	like_creator : [{type : Schema.ObjectId, ref : 'User'}],
	liked_event : [{type : Schema.ObjectId, ref : 'Digitude_event'}]
});

module.exports = mongoose.model('Like', likeSchema);