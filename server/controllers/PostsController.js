const mongoose = require('mongoose');
const postSchema = require('../models/Posts');
const SessionSchema = require('../models/SessionSchema');
const Session = mongoose.model('Session', SessionSchema);
const uuid = require('uuid');

const Post = mongoose.model('Post', postSchema);

const postController = {};

//List all posts
postController.list = (req, res) => {
	Post.find({}).exec((error, posts) => {
		if (error) {
			console.log('Error:', error);
		} else {
			res.send(posts);
		}
	});
};

// create method

postController.login = (req, res) => {
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

postController.save = (req, res) => {
	console.log('EVENT CONTROLLER', req.body);

	let post = new Post({
		title       : req.body.title,
		director    : req.body.director,
		genre       : req.body.genre,
		description : req.body.description,
		image       : req.body.image
	});

	post.save((error) => {
		if (error) {
			console.log('OOPS', error);
			res.send(error);
		} else {
			console.log('Post was created');
			res.send(post);
		}
	});
};

//show method
postController.show = (req, res) => {
	Post.findOne({ _id: req.params.id }).exec((error, post) => {
		if (error) {
			console.log('Error:', error);
		} else {
			res.send(post);
		}
	});
};

//update
postController.update = (req, res) => {
	console.log('testing console', req.query.id, req.params, req.body);
	Post.findByIdAndUpdate(
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
		(error, post) => {
			if (error) {
				console.log(error);
				res.status(400);
				res.send({ error: 'None shall pass' });
			} else {
				res.send(post);
			}
		}
	);
};

//delete
postController.delete = (req, res) => {
	console.log('testing console', req.query.id, req.params, req.body);
	Post.deleteOne({ _id: req.query.id }, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log('post deleted');
			res.send('posts/list');
		}
	});
};

module.exports = postController;
