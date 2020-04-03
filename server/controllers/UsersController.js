const mongoose = require('mongoose');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../config');
const Session = require('../models/Session');
const userController = {};
const moment = require('moment');
const saltRounds = 10;
//List all user
userController.list = (req, res) => {
	User.find({}).exec((error, user) => {
		if (error) {
			console.log('Error:', error);
		} else {
			res.send(user);
		}
	});
};

function createToken(user) {
	/* console.log('user._id  create token', user); */
	if (!user && !user._id) {
		return null;
	}
	let payload = {
		user : user._id
	};

	return payload;
}
/* Create a User */

userController.create = (req, res) => {
	console.log('User controller Request', req.body, req.file);

	if (req.body.email !== '' || req.body.email !== undefined) {
		User.find({ email: req.body.email }, (err, registeredUsers) => {
			if (err) {
				return res.send('Registration failed. Server error');
			} else if (registeredUsers.length > 0) {
				return res.send({
					isRegistered : true,
					msg          : 'already registered'
				});
			} else {
				bcrypt
					.genSalt(saltRounds)
					.then((salt) => {
						console.log(`Salt: ${salt}`);
						return bcrypt.hash(req.body.password, salt);
					})
					.then((hash) => {
						console.log(`Hash: ${hash}`);
						req.body.password = hash;
						const user = new User(req.body);
						user._id = new mongoose.Types.ObjectId();
						let token = createToken(user);

						user.save((error) => {
							if (error) {
								res.status(500).send({ message: `Error creating user: ${error}` });
							} else {
								const sessionObj = {
									token  : token,
									userId : user._id
								};

								const session = new Session(sessionObj);
								session.save((error) => {
									if (error) {
										console.log(error);
										res.send(error);
									} else {
										console.log('token saved');
										return null;
									}
								});
								console.log('User was created successfully');
								return res.status(200).send({
									user    : req.body,
									success : true,
									msg     : 'User registration was successful :)!',
									token   : token.user
								});
							}
						});
					})
					.catch((err) => console.error(err.message));
			}
		});
	} else {
		res.send('Registration failed. Make sure You fulfilled correctly all fields');
	}
};

//login method

/* userController.check = (req, res) => {
	console.log('CONTROLLER', req.body);

	User.find({
		username : req.body.username
	})
		.exec()
		.then((user) => {
			if (user.length < 1) {
				return res.status(401).json({
					message : 'please enter your correct username'
				});
			}
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				// res == true
				if (err) {
					return res.status(404).json({
						message : 'Please enter the correct Password'
					});
				} else {
					const sessionObj = {
						userId : user[0]._id,
						token  : session[0].token
					};
					const session = new Session(sessionObj);
					console.log(user[0].avatar);
					session.save((error) => {
						if (error) {
							console.log(error);
							res.send(error);
						} else {
							console.log('token saved');
							return null;
						}
						console.log('User was Signed in successfully');
						return res.status(200).send({
							success : true,
							msg     : 'User registration was successful :)!',
							token   : sessionObj.token,
							avatar  : user[0].avatar
						});
					});
				}
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error : err
			});
		});
}; */
userController.check = (req, res) => {
	console.log('CONTROLLER', req.body);

	User.find({
		username : req.body.username
	})
		.exec()
		.then((user) => {
			if (user.length < 1) {
				return res.status(401).json({
					message : 'please enter your correct username'
				});
			}
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				// res == true
				if (err) {
					return res.status(404).json({
						message : 'Please enter the correct Password'
					});
				}
				if (result) {
					const token = jwt.sign(
						{
							username : user[0].username,
							userId   : user[0]._id
						},
						config.secret,
						{
							expiresIn : '1h'
						}
					);
					return res.status(200).json({
						message : 'signin successful',

						token   : token
					});
				}
				res.status(401).json({
					message : 'Please enter the right Username  and Password'
				});
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error : err
			});
		});
};

//show method
userController.show = (req, res) => {
	User.findOne({
		_id : req.params.id
	}).exec((error, user) => {
		if (error) {
			console.log('Error:', error);
		} else {
			res.send(user);
		}
	});
};

userController.showDetails = (req, res) => {
	console.log(req.query.id);
	user.find({ _id: req.query.id }, (err, user) => {
		if (err) {
			throw err;
		} else {
			res.send(user);
		}
	});
};
//update
userController.update = (req, res) => {
	User.findByIdAndUpdate(
		req.params.id,
		{
			$set : {
				name       : req.body.username,
				email      : req.body.email,
				username   : req.body.username,
				password   : req.body.password,
				updated_at : req.body.updated_at
			}
		},
		{
			new : true
		},
		(error, user) => {
			if (error) {
				console.log(error);
				res.status(400);
				res.send({
					error : 'None shall pass'
				});
			} else {
				res.send(user);
			}
		}
	);
};

//delete
userController.delete = (req, res, next) => {
	User.deleteOne(
		{
			_id : req.params.id
		},
		(error) => {
			if (error) {
				console.log(error);
				res.status(500).json({
					error : err
				});
			} else {
				console.log('User deleted');
				res.status(200).json({
					message : 'User deleted'
				});
			}
		}
	);
};

userController.saveAvatar = (req, res) => {
	console.log('userController.saveAvatar', req.body, req.body._parts);
	return res.send({
		status : true
	});
};
module.exports = userController;
