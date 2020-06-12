const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SessionSchema = new mongoose.Schema({
	/* 	_id    : Schema.Types.ObjectId, */
	/* NEW */
	token  : {
		type : {
			type : String
		}
	},
	userId : {
		type : String
	},
	date   : {
		type    : Date,
		default : Date.now
	}
});

module.exports = SessionSchema;

/* module.exports = Session = mongoose.model('Session', SessionSchema); */
