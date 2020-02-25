const mongoose = require('mongoose');
const eventSchema = require('../models/Events');
const SessionSchema = require('../models/SessionSchema');
const Session = mongoose.model('Session', SessionSchema);
const uuid = require('uuid');

const Event = mongoose.model('Event', eventSchema);

const eventController = {};

//List all events
eventController.list = (req, res) => {
	Event.find({}).exec((error, events) => {
		if (error) {
			console.log('Error:', error);
		} else {
			res.send(events);
		}
	});
};

// create method

eventController.login = (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	User.findOne({ email, password }).then((user) => {
		if (user) {
			let sessionId = uuid();

			res.cookie('session_id', sessionId, {
				expires : new Date(Date.now() + 900000)
			});

			let session = new Session({
				uuid    : sessionId,
				user_id : user
			});

			session.save();

			res.redirect('/home');
		} else {
			res.redirect('/login');
		}
	});
};

eventController.save = (req, res) => {
	console.log('yooo', req.body);

	let event = new Event({
		title       : req.body.title,
		director    : req.body.director,
		genre       : req.body.genre,
		description : req.body.description,
		rating      : req.body.rating
		/* image       : req.file.path */
	});

	event.save((error) => {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			console.log('Event was created');
			res.send(event);
		}
	});
};

//show method
eventController.show = (req, res) => {
	Event.findOne({ _id: req.params.id }).exec((error, event) => {
		if (error) {
			console.log('Error:', error);
		} else {
			res.send(event);
		}
	});
};

//update
eventController.update = (req, res) => {
	console.log('testing console', req.query.id, req.params, req.body);
	Event.findByIdAndUpdate(
		{ _id: req.query.id },
		{
			$set : {
				title       : req.body.title,
				director    : req.body.director,
				genre       : req.body.genre,
				description : req.body.description,
				rating      : req.body.rating,
				updated_at  : req.body.updated_at
			}
		},
		{ new: true },
		(error, event) => {
			if (error) {
				console.log(error);
				res.status(400);
				res.send({ error: 'None shall pass' });
			} else {
				res.send(event);
			}
		}
	);
};

//delete
eventController.delete = (req, res) => {
	console.log('testing console', req.query.id, req.params, req.body);
	Event.deleteOne({ _id: req.query.id }, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log('event deleted');
			res.send('events/list');
		}
	});
};

module.exports = eventController;
