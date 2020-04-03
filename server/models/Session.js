const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = mongoose.Schema({
	user_id : {
		type : mongoose.Schema.ObjectId
	},
	token   : {
		type : {
			type : String
		}
	},
	userId  : {
		type : String
	},
	date    : {
		type    : Date,
		default : Date.now
	}
});
module.exports = Session = mongoose.models.Session || mongoose.model('Session', SessionSchema);
