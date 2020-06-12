const mongoose = require('mongoose');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
/* const jwt = require('jsonwebtoken'); */
const config = require('../config');
const Session = require('../models/Session');
const userController = {};
const moment = require('moment');
const saltRounds = 10;
const jwt = require('jwt-simple');
//List all user

/* function verifyToken(token) {
	return jwt.verify(token, config.SECRET_TOKEN);
} */
function verifyToken(registeredUsers) {
	console.log('verify token', registeredUsers[0]._id);
	if (!registeredUsers) {
		return null;
	}
	let payload = {
		token : registeredUsers[0]._id
	};

	return payload;
}
/* function createToken(user) {
  if (!user && !user._id) {
    return null;
  }
  let payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment()
      .add(14, "days")
      .unix()
  };

  return jwt.encode(payload, config.SECRET_TOKEN);
} */

function createToken(user) {
	console.log('USER create token ID', user);
	if (!user && !user._id) {
		return null;
	}
	/* 	 let key = config.SECRET_TOKEN;
	console.log('jfkkkkkkk', key);  */
	let payload = {
		sub : user._id,
		iat : moment().unix(),
		exp : moment().add(14, 'days').unix()
	};
	console.log('jfkkkkkkk', payload);
	return payload;
	/* 	return jwt.encode(payload, config.SECRET_TOKEN); */
}

// userController.checkToken = (req, res) => {
//   console.log(req.headers);
//   const token = req.headers.authorization;
//   if (token) {
//     const arr = token.split(" ");
//     if (arr[0] === "Bearer" && arr[1]) {
//       try {
//         return verifyToken(arr[1]);
//       } catch (error) {
//         return null;
//       }
//     }
//     Session.find({ token: req.body.token }).exec((errors, session) => {
//       if (errors) {
//         console.log("error:", error);
//       } else {
//         res.send(session);
//       }
//     });
//   }

//   return null;
// };

User.init();
userController.create = (req, res) => {
	console.log('User controller Request', req.body /* , req.file */);
	if (req.body.username !== '' || req.body.username !== undefined) {
		User.find({ username: req.body.username }, (err, registeredUsers) => {
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
						console.log('Password', req.body.password);
						return bcrypt.hash(req.body.password, salt);
					})
					.then((hash) => {
						console.log(`Hash: ${hash}`);
						req.body.password = hash;
						const user = new User(req.body);
						user._id = new mongoose.Types.ObjectId();
						let token = createToken(user);

						console.log('USER DATA', user._id, 'token', token);
						user.save((error) => {
							if (error) {
								res.status(500).send({ msg: `Error creating user: ${error}` });
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
									token   : token
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

userController.check = (req, res, next) => {
	console.log('CONTROLLER check', req.body);
	User.find({ username: req.body.username }, (err, registeredUsers) => {
		console.log('REGISTERED USER 1 ', registeredUsers);
		if (err) {
			return res.send('Registration failed. Server error');
		} else if (registeredUsers.length > 0) {
			bcrypt.compare(req.body.password, registeredUsers[0].password, (err, response) => {
				if (err) {
					return err;
				} else {
					console.log('REGISTERED USER 2', registeredUsers);
					let token = verifyToken(registeredUsers);
					Session.find({ userId: registeredUsers[0]._id }).exec((errors, session) => {
						console.log('user sessions:', session);
						if (errors) {
							console.log('error:', error);
						} else if (!session) {
						} else {
							const sessionObj = {
								token  : token,
								userId : registeredUsers[0]._id
							};

							const newSession = new Session(sessionObj);
							console.log('new newSession:', newSession);
							newSession.save((error) => {
								if (error) {
									console.log('Error:', error);
									res.send(error);
								} else {
									console.log('token saved', token);
									return null;
								}
							});
							console.log('User was signed in successfully', registeredUsers[0], 'token', token);
							return res.json({
								user    : registeredUsers[0],
								success : true,
								msg     : 'User sign in was successful :)!',
								token   : token
							});
						}
					});
				}
			});
		}
	});
};

//show method
userController.show = (req, res) => {
	console.log('Show id ###', req.query.id);
	User.find({ _id: req.query.id }, (err, user) => {
		console.log('Show user ###', user);
		if (err) {
			console.log('Show user error ###', err);
			throw err;
		} else {
			return res.status(200).send({
				user
			});
		}
	});
};

/* All users */
/* userController.list = (req, res) => {
	User.find({}, (err, user) => {
		res.send(user);
	});
}; */
userController.list = (req, res) => {
	User.find({}).exec((error, user) => {
		if (error) {
			console.log('Error:', error);
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
