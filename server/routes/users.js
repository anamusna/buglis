const express = require('express');
const router = express.Router();
//const multer = require ('multer');

const cors = require('cors');

const postController = require('../controllers/PostsController.js');
const upload = require('../handlers/multer');

//get a list of posts
router.get('/posts/list', cors(), postController.list);

//add a new posts to DB
router.post('/posts/new', upload.single('image'), cors(), postController.save);

//show a post
router.get('/posts/:id', cors(), postController.show);

//update a posts in the DB

router.put('/posts/', cors(), postController.update);

//delete a post in the DB
router.delete('/posts/', cors(), postController.delete);

module.exports = router;
