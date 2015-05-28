var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Admin = new Schema({
	username: String,
	password: String,
	phone: String,
	active: Boolean
});

Admin.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', Admin);