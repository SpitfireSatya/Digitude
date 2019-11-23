var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var digitude_eventSchema = new mongoose.Schema({
	title : String,
	date : Date,
	like_count: [{type : Number, default : 0}],
	comment_count : [{type : Number, default : 0}]
});

module.exports = mongoose.model('Digitude_event', digitude_eventSchema);