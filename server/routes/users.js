const express = require('express');
const router = express.Router();
const cors = require('cors');
const userController = require('../controllers/UsersController.js');

//get a list of users
router.get('/user/list', cors(), userController.list);

//add a new users to DB
router.post('/user/signup', cors(), userController.create);

//signin
router.post('/user/signin', cors(), userController.check);

//show a user

router.get('/user/:id', cors(), userController.show);

//update a users in the DB

router.put('/user/:id', cors(), userController.update);

//delete a user in the DB
router.delete('/user/:id', cors(), userController.delete);

module.exports = router;
