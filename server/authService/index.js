const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
const User = require('../models/Users');
const Session = require('../models/Session');

const bcrypt = require('bcrypt');

verifyToken = (token) => {
	return jwt.verify(token, config.SECRET_TOKEN);
};

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

loginValidation = (req, res) => {
	console.log('LOGIN VALIDATE #####', req.body);

	if (req.body.username !== '' || req.body.username !== undefined) {
		try {
			User.find({ username: req.body.username }, (err, registeredUsers) => {
				if (err) {
					return res.send('OOPs Login Auth failed. Server error');
				} else if (registeredUsers.length > 0) {
					bcrypt.compare(req.body.password, registeredUsers[0].password, (err, response) => {
						if (err) {
							return err;
						} else {
							Session.find({ userId: registeredUsers[0]._id }).exec((errors, session) => {
								if (errors) {
									console.log('error:', error);
								} else if (!session) {
								} else {
									const sessionObj = {
										userId : registeredUsers[0]._id,
										token  : session[0].token
									};
									const newSession = new Session(sessionObj);
									console.log(registeredUsers[0].avatar);
									newSession.save((error) => {
										if (error) {
											console.log(error);
											res.send(error);
										} else {
											return res.status(200).send({
												success : true,
												msg     : 'User registration was successful :)!',
												token   : sessionObj.token,
												avatar  : registeredUsers[0].avatar
											});
										}
									});
								}
							});
						}
					});
				}
			});
		} catch (error) {
			return null;
		}
	} else {
		res.send('Login failed. Make sure You fulfilled correctly all fields');
	}
};

module.exports = {
	verifyToken,
	loginValidation
};
