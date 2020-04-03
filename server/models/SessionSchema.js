const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const SessionSchema = new mongoose.Schema({
	user_id : {
		type : mongoose.Schema.ObjectId
	},
	token   : {
		type : {
			type : String
		}
	},
	userId  : {
		type     : String,
		required : [ true, 'User ID field in the schema is required' ],
		unique   : true,
		trim     : true
	},
	date    : {
		type    : Date,
		default : Date.now
	}
});

module.exports = SessionSchema;
