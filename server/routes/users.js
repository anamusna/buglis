const express = require('express');
const router = express.Router();
//const multer = require ('multer');

const cors = require('cors');

const eventController = require('../controllers/EventsController.js');
const upload = require('../handlers/multer');

//get a list of events
router.get('/events/list', cors(), eventController.list);

//add a new events to DB
router.post('/events/new', upload.single('image'), cors(), eventController.save);

//show a event
router.get('/events/:id', cors(), eventController.show);

//update a events in the DB

router.put('/events/', cors(), eventController.update);

//delete a event in the DB
router.delete('/events/', cors(), eventController.delete);

module.exports = router;
