var express = require('express');
var app = express(); //initializes app as express application
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json()); //for parsing our bodies for api calls

Genre = require('./models/genres');
Book = require('./models/book');
User = require('./models/users');

//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('Please use1 /api/books or /api/genres');
});

//USER USER USER USER USER
app.get('/api/users', function(req, res){
	User.getUsers(function(err, users){
		if(err){
			throw err;
		}
		res.json(users);
	});
});

app.get('/api/users/:_id', function(req, res){
	User.getUserById(req.params._id, function(err, user){
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.post('/api/users', function(req, res){
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

app.delete('/api/users/:_id', function(req, res){  //body is updated user
	var id = req.params._id
	User.removeUser(id, function(err, id){
		if(err){
			throw err;
		}
		res.json(id);
	});
});
//USER USER USER USER USER

app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.post('/api/books', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);
console.log('Running on port 3000');