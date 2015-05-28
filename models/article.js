var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Article = new Schema({
	Author: String,
	Title: String,
	Wrote: Date,
	Num: String
});

module.exports = mongoose.model('Article', Article);