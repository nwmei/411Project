var mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	}
});

var User = module.exports = mongoose.model('User', userSchema); //now User can be accessed outside

// get Users
module.exports.getUsers = function(callback, limit){
	User.find(callback).limit(limit);
}

// get User by ID
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

// add User (new user)
module.exports.addUser = function(user, callback){
	User.create(user, callback);
}

// update User
module.exports.updateUser = function(id, user, options, callback){
	var query = {_id: id};
	var update = {
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email
	}
	User.findOneAndUpdate(query, update, options, callback);
}

// delete User 
module.exports.removeUser = function(id, callback){
	var query = {_id: id};
	User.remove(query, callback);
}