const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new mongoose.Schema({
	_id        : Schema.Types.ObjectId,
	name       : {
		type     : String,
		required : [ true, 'name field in Users is required' ],
		trim     : true
	},
	email      : {
		type     : String,
		required : true,
		unique   : true,
		match    : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
	},
	username   : {
		type     : String,
		required : true,
		trim     : true
	},
	password   : {
		type     : String,
		required : true
	},
	updated_at : {
		type    : Date,
		default : Date.now
	},
	avatar     : {
		type : String
	}
});

module.exports = mongoose.model('User', usersSchema);
