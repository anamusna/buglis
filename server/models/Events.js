const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
	title       : {
		type   : String,
		unique : true,
		trim   : true
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

	/* 	image       : {
		type : Object
	}, */
	updated_at  : {
		type    : Date,
		default : Date.now
	}
});

module.exports = eventSchema;
