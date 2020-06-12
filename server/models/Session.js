const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new mongoose.Schema({
	token  : {
		type : String
	},
	userId : {
		type : String
	},
	date   : {
		type    : Date,
		default : Date.now
	}
});
module.exports = Session = mongoose.models.Session || mongoose.model('Session', SessionSchema);
