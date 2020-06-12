const express = require('express');
const router = express.Router();
const cors = require('cors');
const userController = require('../controllers/UsersController.js');
const { loginValidation } = require('../authService/index');

//get a list of users
router.get('/user/list', cors(), userController.list);

//add a new users to DB
router.post('/user/signup', cors(), userController.create);

//signin
/* router.post('/user/signin', cors(), loginValidation); */
router.post('/user/signin', cors(), userController.check);
//show a user

router.get('/user/show', cors(), userController.show);

router.get('/user/:id', cors(), userController.show);

//update a users in the DB

router.put('/user/:id', cors(), userController.update);

//delete a user in the DB
router.delete('/user/:id', cors(), userController.delete);

/* router.get('/user/show', cors(), userController.show); */

//upload an avatar image

router.post('/api/user/save_avatar', cors(), userController.saveAvatar);

module.exports = router;
