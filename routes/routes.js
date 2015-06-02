var passport = require('passport');
var admin = require('../models/admin');
var article = require('../models/article');
var fs = require('fs');
var fsextra = require('fs-extra');
var util = require('util');
var path = require('path');
var multer = require('multer');

function chng(article, fimg)
{
	var tot, i, rep, rept, sch, ps, p;

	if (article)
	{
		JSON.stringify(fimg);
		console.log(fimg.length);
		tot = Object.keys(fimg).length - 1;
		console.log("tot : " + tot);
		i = 0;
		while (i < tot)
		{
			rep = 'img' + (i + 1);
			console.log(rep);
			console.log(fimg);
			console.log(fimg.img1);
			console.log(fimg[rep]);
			console.log("." + fimg[rep].extension);
			rept = "%" + rep + "%";
			path = "/img/article/<%= Num %>/" + rep + "." + fimg[rep].extension;
			sch = "<img class=\"col-xs-12 col-sm-10 col-md-10 col-lg-10 col-sm-offset-1\" src=\"" + path + "\">"; 
			article = article.replace(rept, sch);
			i++;		
		}
		ps = "<p class=\"intro text-justify text\">";
		p = /<p>/ig;
		article = article.replace(p, ps);
		console.log('final : ' + article);
		return (article);
	}

}

module.exports = function(app, dirname)
{
	app.get('/', function(req, res){
		article.find({}, function(err, articles){
			if (err)
				console.log(err);
			else
			{
				articles.sort({ Wrote : 1 });
				res.layout('layout', { title : "Home", user : req.user }, { content : { block : "home", data : { articles : articles } } });
			}
		});
	});
	app.get('/admin', function(req, res){
			res.layout('layout', { title : "administration", user : req.user }, { content : { block : "admin", data : { user : req.user } } });
	});
	app.get('/register', function(req, res){
		if (typeof req.user == "undefined")
			res.layout('layout', { title : "inscription", user : req.user }, { content : { block : "register", data : { error : false } } });
		else
			return(res.redirect('/admin'));
	});
	app.post('/register', function(req, res){
		admin.register(new admin({ username : req.body.username, phone : req.body.phone, active : false }), req.body.password, function(err, account){
			if (err)
			{
				console.log(err);
				res.layout('layout', { title : "inscription", user : req.user }, { content : { block : "register", data : { error : true } } });
			}
			else
			{
				res.redirect('/');
				console.log('a new admin registered');
			}
		});
	});
	app.get('/login', function(req, res){
		if (typeof req.user == "undefined")
			res.layout('layout', { title : "connexion", user : req.user }, { content : { block : "login", data : { error : false } } });
		else
			res.redirect('/admin');
	});
	app.post('/login', function(req, res){
		passport.authenticate('local', function(err, user){
			if (err)
				console.log(err);
			if (!user)
				res.layout('layout', { title : "connexion", user : req.user }, { content : { block : "login", data : { error : true } } });
			else
			{
				req.logIn(user, function(err){
					if (err)
						console.log(err);
					return (res.redirect('/'));
				});
			}
		})(req, res);
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/post/article', function(req, res){
		if (typeof req.user != "undefined")
		{
			admin.find({ username : req.user.username }, { _id : 0, hash : 0 }, function(err, user){
				if (user.length != 1)
					return(res.redirect('/'));
				else
					res.layout('layout', { title : "rédiger un article", user : req.user }, { content : { block : "article" } });
			});
		}
	});
	app.post('/post/article', function(req, res) {
		console.log(req.body.article);
		console.log(dirname);
		var nb;
		article.count({}, function(err, whole) {
			if (err)
				console.log(err);
			console.log(whole);

			nb = whole;
			if (nb < 10)
				nb = '0' + nb.toString();
			else
				nb = nb.toString();
			var newarticle = new article({
				Author: req.user.username,
				Title: req.body.title,
				Wrote: Date.now(),
				Num: nb
			});
			var template = dirname + '/views/' + nb + '.ejs';
			console.log(template);
			var start = "<link rel=\"stylesheet\" type=\"text/css\" href=\"/css/base.css\" media=\"screen\">"
			start += "<div id=\"myart\" class=\"container\">\n";
			start += "	<div id=\"corpse\" class=\"row\">\n";
			start += "		<div class=\"col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1\">\n";
			start += "			<h1 class=\"text-center\"><%= title %></h1>\n";
			fs.writeFile(template, start, function(err) {
				if (err)
					console.log(err);
				console.log('the file was created !');
				var bodyart = req.body.article;
				bodyart = chng(bodyart, req.files);	
				fs.appendFile(template, bodyart, function(err) {
					if (err)
						console.log(err);
					console.log('the template was appended');
					var end = "\n			</div>\n";
					end += "	</div>\n";
					end += "</div>\n";
					fs.appendFile(template, end, function(err) {
						if (err)
							console.log(err);
						newarticle.save(function (err) {
							if (err)
								console.log(err);
							else
							{
								console.log('a new article was added, he\'s title is : ' + req.body.title);
								res.redirect('/');
							}
						});
					});
				});
			});
		});
	});
	app.get('/articles/:num', function(req, res){
		var num = req.params.num;
		article.find({ Num : num }, function(err, articles){
			if (err)
				console.log(err);
			else if (articles.length == 1)
			{
				var date;
				if (articles[0].Wrote.getDate() < 10)
					date = '0' + articles[0].Wrote.getDate().toString() + '/';
				else
					date = articles[0].Wrote.getDate().toString() + '/';
				if (articles[0].Wrote.getMonth() < 10)
					date = date + '0' + articles[0].Wrote.getMonth().toString() + '/';
				else
					date = date + articles[0].Wrote.getDate().toString() + '/';
				date = date + articles[0].Wrote.getFullYear().toString();
				res.layout('layout', { title : articles[0].Title, user : req.user }, { content : { block : num, data : { title : articles[0].Title, date : date, author : articles[0].Author, Num : num } } });
			}
			else
				res.redirect('/');
		});
	});
}