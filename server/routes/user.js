const router = require('express').Router();
const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');
const { loginValidation } = require('../authService/index');

const uuidV4 = require('uuid/v4');
const cors = require('cors');

router.post('/api/user/signup', cors(), userController.create);

router.post('/api/user/update', imageUpload.single('avatar'), userController.updateUser);

//get all

router.get('/api/user/listAll', userController.listAll);
router.get('/api/user/showDetails', userController.showDetails);

//upload an avatar image

router.post('/api/user/save_avatar', userController.saveAvatar);

//validate and login users
/* router.post('/api/user/signin', cors(), userController.check); */

router.post('/api/user/signin', cors(), userController.check);

module.exports = router;
