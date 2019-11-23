var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
	value : String,
	date : Date,
	comment_creator : [{type : Schema.ObjectId, ref : 'User'}],
	comment_event : [{type : Schema.ObjectId, ref : 'Digitude_event'}]
});

module.exports = mongoose.model('Comment', commentSchema);