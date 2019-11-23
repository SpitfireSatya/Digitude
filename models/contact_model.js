var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new mongoose.Schema({
  	name : String,
  	email : String,
  	subject : String,
  	description : String
 });

module.exports = mongoose.model('Contact', contactSchema);