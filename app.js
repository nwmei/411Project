var express = require('express');
var app = express(); //initializes app as express application
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json()); //for parsing our bodies for api calls

User = require('./models/users');

//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('Please use1 /api/books or /api/genres');
});

app.get('/api/users', function(req, res){ //no body
	User.getUsers(function(err, users){
		if(err){
			throw err;
		}
		res.json(users);
	});
});

app.get('/api/users/:_id', function(req, res){ //no body
	User.getUserById(req.params._id, function(err, user){
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.post('/api/users', function(req, res){ //body is new user
	var user = req.body;
	User.addUser(user, function(err, user){
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.put('/api/users/:_id', function(req, res){  //body is updated user
	var id = req.params._id
	var user = req.body;
	User.updateUser(id, user, function(err, user){
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.delete('/api/users/:_id', function(req, res){  //no body
	var id = req.params._id
	User.removeUser(id, function(err, id){
		if(err){
			throw err;
		}
		res.json(id);
	});
});


app.listen(3000);
console.log('Running on port 3000');