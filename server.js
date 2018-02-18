var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejs-mate = require('ejs-mate');

var User = require('./models/user')

var app = express()

mongoose.connect('mongodb://cosmos:cosmos1215@ds235788.mlab.com:35788/ecommerce', function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to the database");
	}
});

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', ejs-mate);
app.set('view engine', 'ejs');


app.post('/create-user', function(req, res, next){
	var user = new User();

	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

    user.save(function(err) {
    	if (err) return next(err);
    	res.json('Successfully created a new user');
    });
});

app.listen(3000, function(err) {
	if (err) throw err;
    console.log("Server is Rungging on port 3000");
});

