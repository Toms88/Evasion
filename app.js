//Loading the modules
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var layouts = require('ejs-layouts');
var http = require('http');
var nodeMailer = require('nodemailer');
var mongoose = require('mongoose');
var passport = require('passport');
var logger = require('morgan');
var fs = require('fs-extra');
var util = require('util');
var multer = require('multer');
var methodOverride = require('method-override');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

//Creating the server
var server = http.Server(app);
var io = require('socket.io')(server);

//Loading the models for communicate with the db
var admin = require('./models/admin');
var article = require('./models/article');

//Connection to the database
mongoose.connect('mongodb://localhost:27017/evasions');
//mongoose.connect('mongodb://78.213.4.159:27017/evasions');
function format(fname){
	var len = (fname.length) - 1;
	var fmt = fname[len - 3] + fname[len - 2] + fname[len - 1] + fname[len];
	return (fmt);
}

//setting the view engine, choosing the port, choosing a folder for the views
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//defining what the server will use as default settings
app.use(layouts.express);
app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({
	dest: './temp/',
	onFileUploadComplete: function (file, req, res) {
		var fmt = format(file.name);
		var name;
		var nb;
		console.log("yo!");
		article.count({}, function (err, whole) {
			if (err)
				console.log(err);
			console.log(whole);
			nb = whole;
			//if (typeof nb === "undefined")
			//	nb = 0;
			if (nb < 10)
				var dir = '0' + nb;
			else
				var dir = nb.toString();
			if (fmt == '.ejs') {
				name = dir + fmt;
				fs.rename(file.path, './views/' + name, function (err) {
					if (err)
						console.log(err);
					else
						console.log(file.fieldname + 'was moved !');
				});
			}
			else if ((fmt == '.png') || (fmt == '.jpg')) {
				if (file.fieldname == 'icone') {
					fs.mkdir(__dirname + '/public/img/article/' + dir, 0755, function (err) {
						if (err)
							console.log(err);
						else
						{
							console.log('directory successfully created');
							name = file.fieldname + fmt;
							fs.rename(file.path, __dirname + '/public/img/article/' + dir + '/' + name, function(err){
								if (err)
									console.log(err);
								else
								{
									console.log(file.fieldname + 'was moved !');
								}
							});
						}
					});
				}
				else
				{
					name = file.fieldname + fmt;
					fs.rename(file.path, __dirname + '/public/img/article/' + dir + '/' + name, function (err) {
						if (err)
							console.log(err);
						else
							console.log(file.fieldname + 'was moved ! ');
					});
				}
			}
			console.log(file.fieldname + ' uploaded');
		});
	}
}));
app.use(methodOverride());
app.use(cookieParser('secret'));
app.use(expressSession({
	secret: 'r409l4210u',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//choosing a folder for the static files
app.use(express.static(__dirname + '/public'));

//CONFIGURING PASSPORT

//STEP 1
passport.use(new LocalStrategy(admin.authenticate()));

//STEP 2
passport.serializeUser(admin.serializeUser());

//STEP 3
passport.deserializeUser(admin.deserializeUser());

//END

//Loading the routes
require('./routes/routes')(app);

io.sockets.on('connection', function(socket){
	socket.on('new', function(title, Article){
		var new_art = new article({ Title : title, Wrote : wrote, Article : Article });
		new_art.save(function(err){
			if (err)
				console.log(err);
			else
			{
				console.log('un nouvel article à été posté ! ');
				socket.broadcast.emit('posted', new_art);
			}
		});
	});
	socket.on('existing', function(user){
		console.log('on est dans le serveur');
		admin.find({ username : user }, function(err, user){
			if (err)
				console.log(err);
			if (user.length > 0)
				socket.emit('exist', user[0].active);
			else
				socket.emit('nexist');
		});
	});
});


server.listen(app.get('port'), function(){
	console.log('the server is listening on port ' + app.get('port'));
});









