const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
	title       : {
		type     : String,
		required : [ true, 'Title field is required' ],
		unique   : true,
		trim     : true
	},
	director    : {
		type : String
	},
	genre       : {
		type : String
	},
	description : {
		type : String,
		trim : true
	},

	image       : {
		type : Object
	},
	updated_at  : {
		type    : Date,
		default : Date.now
	}
});

module.exports = postSchema;
